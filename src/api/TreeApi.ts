import Api from '../classes/Api';

export default class TreeApi {
  private readonly api: Api;

  constructor(baseUrl: string, delay: number) {
    this.api = new Api(baseUrl, delay);
  }

  getItems(): Promise<Response> {
    return this.api.get('/data/json/items.json');
  }
}