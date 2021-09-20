import { Message, MessageEmbed } from 'discord.js';
import { MessageButton } from 'discord-buttons'
import NezumiClient from '../../NezumiClient';
import {Command, Container} from '../../structures/Command';

export default class Ping extends Command {
    constructor(client: NezumiClient) {
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

    async run(msg: Message, container: Container): Promise<Command> {

        const args = container.args;
        const member = msg.mentions.users.first() || this.client.users.cache.get(args[1]);
        const reason = msg.content.split(' ').slice(2).join(' ');

        if (!member) {
            msg.reply(`Tem certeza que você leu o manual!? O comando se usa assim: \`${this.usage}\``);
            return this;
        };

        const banEmbed = new MessageEmbed();

        banEmbed.setTitle(`${member.username} foi banido!`)
        banEmbed.setThumbnail(<string>member.avatarURL({dynamic: true}));
        banEmbed.setDescription(reason);
        banEmbed.addField('Banido por:', msg.author.tag);
        banEmbed.addField('ID do autor', msg.author.id);
        banEmbed.addField('Tag do banido', member)

        await msg.channel.send(banEmbed);

        return this;
    }
}
