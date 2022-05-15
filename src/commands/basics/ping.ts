import { Message } from 'discord.js';
import SelenaClient from '../../SelenaClient';
import Command from '../../structures/Command';

export default class Ping extends Command {
  constructor(client: SelenaClient) {
    super(client, {
      name: 'ping',
      description: '',
      aliases: ['pingo'],
      category: 'basic',
      cooldown: 10,
      botPerms: [],
      userPerms: [],
      usage: '',
    });
  }

  async run(msg: Message): Promise<Command> {
    msg.reply('pong!!!');
    return this;
  }
}
