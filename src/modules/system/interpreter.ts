import { Message } from 'discord.js';
import { SGuild } from '../../interfaces/Guild';
import SelenaClient from '../../SelenaClient';

export default class MessageEvent {
    private client: SelenaClient;

    public trigger: string = 'message';

    constructor(client: SelenaClient) {
      this.client = client;
    }

    async run(message: Message): Promise<void> {
      const guildData: SGuild = await this.client.database.getGuild(message.guild?.id!);

      if (message.author.bot) return;
      if (!message.content.startsWith(guildData.prefix, undefined)) return;

      const args: string[] = message.content.split(/\s+/g);
      const command: string = message.content.split(' ')[0].slice(1);

      const cmd: any = this.client.commands.get(command);

      if (!cmd) return;
      cmd.check(message, args, message.member, guildData);
    }
}
