import { Guild } from 'discord.js';
import SelenaClient from '../../SelenaClient';

export default class guildCreate {
  private client: SelenaClient;

  public trigger: string = 'guildCreate';

  constructor(client: SelenaClient) {
    this.client = client;
  }

  async run(guild: Guild) {
    try {
      await this.client.database.prisma.guild.create({ data: { id: guild.id } });
      this.client.log('success', `Servidor: ${guild.id} adicionado ao banco de dados.`);
    } catch (error) {
      this.client.log('error', `Erro ao adicionar servidor ${guild.id} ao banco de dados.`);
    }
  }
}
