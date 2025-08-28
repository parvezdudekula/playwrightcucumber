import { promises as fs } from 'fs';
import path from 'path';


const logPath = path.resolve(__dirname, 'autohealer-log.json');

export async function logHealingEvent(event: any) {
  let log: any[] = [];
  try {
    const data = await fs.readFile(logPath, 'utf-8');
    log = JSON.parse(data);
  } catch {}
  log.push({ ...event, timestamp: new Date().toISOString() });
  await fs.writeFile(logPath, JSON.stringify(log, null, 2), 'utf-8');
  // Attach to Allure if available
  const g: any = globalThis;
  if (g && g.allure && typeof g.allure.attachment === 'function') {
    g.allure.attachment('AutoHealer Event', JSON.stringify(event, null, 2), 'application/json');
  }
}

// Sample AI/ML hook: OpenAI API call for selector healing
export async function aiSuggestSelector(dom: string, failedSelector: string, key: string): Promise<string | null> {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an expert web automation AI. Suggest a robust CSS selector for the described element.' },
          { role: 'user', content: `DOM:\n${dom}\nFailed selector: ${failedSelector}\nElement key: ${key}\nSuggest a new selector:` }
        ],
        max_tokens: 50
      })
    });
    if (!response.ok) return null;
    const data = await response.json();
    // Parse the selector from the AI's response
    const selector = data.choices?.[0]?.message?.content?.trim();
    return selector || null;
  } catch (e) {
    console.warn('AI selector API call failed:', e);
    return null;
  }
}
