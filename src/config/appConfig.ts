import { promises as fs } from 'fs';
import path from 'path';

let appConfig: any = {};

export async function loadAppConfig(app: string) {
  const configFile = path.resolve(__dirname, `appConfig.${app}.json`);
  const data = await fs.readFile(configFile, 'utf-8');
  appConfig = JSON.parse(data);
}

export function getAppConfig() {
  return appConfig;
}

export function getUrl(key: string): string | undefined {
  if (!appConfig.baseUrl || !appConfig.urls) return undefined;
  return appConfig.baseUrl + (appConfig.urls[key] || '');
}

export function getApiEndpoint(key: string): string | undefined {
  if (!appConfig.apiBaseUrl || !appConfig.apiEndpoints) return undefined;
  return appConfig.apiBaseUrl + (appConfig.apiEndpoints[key] || '');
}
