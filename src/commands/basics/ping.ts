import { Message } from 'discord.js';
import NezumiClient from '../../NezumiClient';
import { Command } from '../../structures/Command';

export default class Ping extends Command {
  constructor(client: NezumiClient) {
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
