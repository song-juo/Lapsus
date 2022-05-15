import { Message, MessageEmbed } from 'discord.js';
import SelenaClient from '../../SelenaClient';
import Command from '../../structures/Command';
import IContainer from '../../interfaces/Container';

export default class Ban extends Command {
  constructor(client: SelenaClient) {
    super(client, {
      name: 'ban',
      description: 'Bane um usuário do servidor.',
      aliases: ['banir'],
      category: 'moderation',
      cooldown: 5,
      botPerms: ['BAN_MEMBERS'],
      userPerms: ['BAN_MEMBERS'],
      usage: '<prefixo>ban [MENÇÃO/ID] {Motivo}',
    });
  }

  async run(msg: Message, container: IContainer): Promise<Command> {
    const { args, guildData } = container;
    const user = msg.mentions.users.first() || this.client.users.cache.get(args[1]);
    const reason = msg.content.split(' ').slice(2).join(' ');

    if (!user) {
      msg.reply(`Tem certeza que você leu o manual!? O comando se usa assim: \`${this.usage}\``);
      return this;
    }

    await msg.guild?.members.ban(user)
      .then(async () => {
        const mod = guildData.moderation.staffs?.get(msg.author.id);
        const banEmbed = new MessageEmbed();

        banEmbed.setTitle(`${user.username} foi banido!`);
        banEmbed.setThumbnail(<string>user.avatarURL({ dynamic: true }));
        banEmbed.setDescription(`Motivo: ${reason}`);
        banEmbed.setImage(mod?.customGif as string);
        banEmbed.setColor('#FF0000');
        banEmbed.addField('🔨 Banido por:', msg.author.tag);
        banEmbed.addField('🆔 ID do autor', msg.author.id);
        banEmbed.addField('❌ Tag do banido', user);

        await msg.channel.send(banEmbed);
      })
      .catch(() => msg.channel.send('Oops, não consigo banir esse cara! D='));

    return this;
  }
}
