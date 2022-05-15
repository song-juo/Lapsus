import { Guild } from 'discord.js';
import SelenaClient from '../../SelenaClient';

export default class guildDelete {
    private client: SelenaClient;

    public trigger: string = 'guildDelete';

    constructor(client: SelenaClient) {
      this.client = client;
    }

    async run(guild: Guild) {
      try {
        await this.client.database.prisma.guild.delete({ where: { id: guild.id } });
        this.client.log('warn', `Fui removida do servidor ${guild.id}, dados deletados do banco.`);
      } catch (error) {
        this.client.log('error', `Erro ao deletar servidor ${guild.id} ao banco de dados.`);
      }
    }
}
