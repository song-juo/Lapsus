// @ts-ignore
import { PrismaClient } from '@prisma/client';
import NezumiClient from '../NezumiClient';
import NCache from './Cache';

export class Database {
    private cache: NCache;

    public prisma: PrismaClient;

    public client: NezumiClient;

    constructor(client: NezumiClient) {
      this.client = client;
      this.cache = this.client.cache;
      this.prisma = new PrismaClient();
    }

    async getGuild(guildID: string) {
      let fetchedGuild;

      fetchedGuild = await this.cache.tedis.get(`guild:${guildID}`);

      if (!fetchedGuild) {
        fetchedGuild = await this.prisma.guild.findUnique({ where: { id: guildID } });
        await this.cache.tedis.set(`guild:${guildID}`, JSON.stringify(fetchedGuild));
      } else {
        fetchedGuild = JSON.parse(fetchedGuild as string);
      }

      return fetchedGuild;
    }
}
