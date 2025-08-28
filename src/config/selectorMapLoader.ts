import { promises as fs } from 'fs';
import path from 'path';

let selectorMap: Record<string, string> = {};

export async function loadSelectorMap(site: string) {
  const configFile = path.resolve(__dirname, `selectorMap.${site}.json`);
  const data = await fs.readFile(configFile, 'utf-8');
  selectorMap = JSON.parse(data);
}

export function getSelector(key: string): string | undefined {
  return selectorMap[key];
}
