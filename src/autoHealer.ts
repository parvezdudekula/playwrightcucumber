import { promises as fs } from 'fs';

import { logHealingEvent, aiSuggestSelector } from './autoHealerLog';
import { getSelector } from './config/selectorMapLoader';
import { Page } from 'playwright';
import path from 'path';
const repoPath = path.resolve(__dirname, 'objectRepository.json');

export type SelectorEntry = {
  selector: string;
  type: string;
};

export class ObjectRepository {
  private static cache: Record<string, SelectorEntry> | null = null;

  static async load(): Promise<Record<string, SelectorEntry>> {
    if (!this.cache) {
      const data = await fs.readFile(repoPath, 'utf-8');
      this.cache = JSON.parse(data);
    }
    return this.cache || {};
  }

  static async save(): Promise<void> {
    if (this.cache) {
      await fs.writeFile(repoPath, JSON.stringify(this.cache, null, 2), 'utf-8');
    }
  }

  static async get(key: string): Promise<SelectorEntry | undefined> {
    const repo = await this.load();
    return repo[key];
  }

  static async set(key: string, entry: SelectorEntry): Promise<void> {
    const repo = await this.load();
    repo[key] = entry;
    await this.save();
  }
}

export class AutoHealer {
  static async findAndHeal(page: Page, key: string): Promise<string | null> {
    // Try dynamic selectorMap first
    const staticSelector = getSelector(key);
    if (staticSelector) {
      try {
        await page.waitForSelector(staticSelector, { timeout: 2000 });
        return staticSelector;
      } catch {}
    }
    const entry = await ObjectRepository.get(key);
    if (!entry) return null;
    try {
      await page.waitForSelector(entry.selector, { timeout: 2000 });
      return entry.selector;
    } catch {
      const dom = await page.content();
      const url = page.url();
      const textKey = key.replace(/([A-Z])/g, ' $1').trim();
      // 1. Try by text
      const altText = await page.$(`text=${textKey}`);
      if (altText) {
        const healed = { selector: `text=${textKey}`, type: 'text' };
        await ObjectRepository.set(key, healed);
        await logHealingEvent({ key, original: entry, healed, strategy: 'text', url, dom });
        return healed.selector;
      }
      // 2. Try by role (common for buttons, inputs)
      const roleMap: Record<string, 'button' | 'textbox'> = {
        loginButton: 'button',
        usernameInput: 'textbox',
        passwordInput: 'textbox'
      };
      if (roleMap[key]) {
        const altRole = await page.getByRole(roleMap[key], { name: textKey }).elementHandle();
        if (altRole) {
          const healed = { selector: `role=${roleMap[key]}[name=\"${textKey}\"]`, type: 'role' };
          await ObjectRepository.set(key, healed);
          await logHealingEvent({ key, original: entry, healed, strategy: 'role', url, dom });
          return healed.selector;
        }
      }
      // 3. Try by placeholder (for inputs)
      const altPlaceholder = await page.$(`input[placeholder*='${textKey}']`);
      if (altPlaceholder) {
        const healed = { selector: `input[placeholder*='${textKey}']`, type: 'placeholder' };
        await ObjectRepository.set(key, healed);
        await logHealingEvent({ key, original: entry, healed, strategy: 'placeholder', url, dom });
        return healed.selector;
      }
      // 4. Try by attribute (id, name)
      const altId = await page.$(`#${textKey}`);
      if (altId) {
        const healed = { selector: `#${textKey}`, type: 'id' };
        await ObjectRepository.set(key, healed);
        await logHealingEvent({ key, original: entry, healed, strategy: 'id', url, dom });
        return healed.selector;
      }
      const altName = await page.$(`[name='${textKey}']`);
      if (altName) {
        const healed = { selector: `[name='${textKey}']`, type: 'name' };
        await ObjectRepository.set(key, healed);
        await logHealingEvent({ key, original: entry, healed, strategy: 'name', url, dom });
        return healed.selector;
      }
      // 5. Modular AI/ML hook
      const aiSelector = await aiSuggestSelector(dom, entry.selector, key);
      if (aiSelector) {
        const healed = { selector: aiSelector, type: 'ai' };
        await ObjectRepository.set(key, healed);
        await logHealingEvent({ key, original: entry, healed, strategy: 'ai', url, dom });
        return healed.selector;
      }
      // Add more strategies as needed
      await logHealingEvent({ key, original: entry, healed: null, strategy: 'failed', url, dom });
      console.warn(`[AutoHealer] Failed to heal selector for ${key}`);
      return null;
    }
  }
}
