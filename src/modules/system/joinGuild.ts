import { Guild } from 'discord.js';
import NezumiClient from '../../NezumiClient';

export default class Ready {
  private client: NezumiClient;

  public trigger: string = 'guildCreate';

  constructor(client: NezumiClient) {
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
