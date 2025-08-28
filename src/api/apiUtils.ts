import axios from 'axios';

export async function sendApiRequest(method: string, url: string, data?: any) {
  return axios({ method, url, data });
}
