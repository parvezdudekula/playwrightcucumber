import axios, { AxiosRequestConfig } from 'axios';

export async function apiRequest(config: AxiosRequestConfig) {
  const response = await axios(config);
  return response.data;
}
