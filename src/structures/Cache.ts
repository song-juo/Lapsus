import { Tedis } from 'tedis';
import SelenaClient from '../SelenaClient';

/**
 * Redis instance manager, great for handling large amounts
 * of commands without stress our database
 */

export default class NCache {
    private client: SelenaClient;

    public tedis: Tedis;

    constructor(client: SelenaClient) {
      this.client = client;

      this.tedis = new Tedis({ port: 6379, host: '127.0.0.1' });

      this.tedis.on('connect', () => {
        this.client.log('error', 'Redis online!');
      });
    }

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

    /**
     * @param commandName Name of the target command
     * @param id Member's ID (external: from Discord)
     * @param time Cooldown time in seconds
     * Command speficif cooldown feature, mitigates the user
     * from using this specific command, until the cooldown
     * still going.
     */
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
