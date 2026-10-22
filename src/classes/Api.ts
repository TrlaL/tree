import { sleep } from '../utils/sleep';

export default class Api {
  private readonly baseUrl: string;
  private readonly delay: number;

  constructor(baseUrl: string, delay = 0) {
    this.baseUrl = baseUrl;
    this.delay = delay;
  }

  async get(url: string): Promise<Response> {
    await sleep(this.delay);
    return fetch(this.baseUrl + url, { method: 'GET' });
  }
}