import { PrismaClient } from '@prisma/client';
import { SGuild } from '../interfaces/Guild';
import SelenaClient from '../SelenaClient';
import NCache from './Cache';
import GuildData from './GuildData';

export default class Database {
    private cache: NCache;

    public prisma: PrismaClient;

    public client: SelenaClient;

    constructor(client: SelenaClient) {
      this.client = client;
      this.cache = this.client.cache;
      this.prisma = new PrismaClient();
      this.prisma.$connect().then(() => {
        this.client.log('info', 'PostgreSQL started');
      });
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

      const guildData: SGuild = new GuildData(fetchedGuild);
      return guildData;
    }
}
