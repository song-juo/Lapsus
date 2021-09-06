import { Tedis } from 'tedis';
import NezumiClient from '../NezumiClient';

export default class NCache {
    private client: NezumiClient;

    public tedis: Tedis;

    constructor(client: NezumiClient) {
      this.client = client;

      this.tedis = new Tedis({ port: 6379, host: '127.0.0.1' });

      this.tedis.on('connect', () => {
        this.client.log('error', 'Redis online!');
      });
    }

    // Basic queries
    async set(queryOption: string, queryID: string) {
      const result = await this.tedis.set(queryOption, queryID);
      return result;
    }

    async find(queryOption: string, queryID: string) {
      const result = await this.tedis.get(`${queryOption}:${queryID}`);
      return result;
    }

    async delete(key: string, value: string) {
      const result = await this.tedis.del(`${key}:${value}`);
      return result;
    }

    // Cooldown abstraction section
    async setCooldown(commandName: string, id: string, time: any) {
      const identifier: string = `cooldown:${id}:${commandName}`;
      await this.tedis.set(identifier, time);
    }

    async removeCooldown(commandName: string, id: string) {
      const identifier: string = `cooldown:${id}:${commandName}`;
      await this.tedis.del(identifier);
    }

    async checkCooldown(commandName: string, id: string) {
      const identifier: string = `cooldown:${id}:${commandName}`;
      const r = await this.tedis.get(identifier);

      return r !== null ? r : false;
    }
}
