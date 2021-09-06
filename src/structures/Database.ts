import { PrismaClient } from '@prisma/client';
import NezumiClient from '../NezumiClient';
import NCache from './Cache';

export interface NGuild {
    id: string;
    prefix: string;
    antispam: JSON;
    autoroleID: string;
    security: JSON;
    welcome: JSON;
    leave: JSON;
    blacklisted: JSON;
}

export interface NUser {
    id: string;
    xp: number;
    blacklisted: boolean
}

export interface NMember {
    id: string;
    xp: string;
    blacklisted: boolean;
}

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
