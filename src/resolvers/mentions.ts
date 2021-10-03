/* eslint-disable consistent-return */
import { GuildMember, Message } from 'discord.js';

export default {
  name: 'mentions',
  resolve: (msg: Message, content: string = '854548450603565097', bot: boolean = false) => {
    const { guild }: Message = msg;
    const rawMentions = msg?.mentions?.members?.map((m) => m).length;
    if (!rawMentions) {
      const members = guild?.members.cache.filter((m): m is GuildMember => {
        if (!bot && m.user.bot) return false;
        const name = m.user.username.toLowerCase();
        const nick = m.nickname ? m.nickname.toLowerCase() : name;
        const discrim = m.user.discriminator;
        const memberID = m.user.id;

        console.log(name);

        return name === content || nick === content
        || `${name}#${discrim}` === content
        || `${nick}#${discrim}` === content
        || name.includes(content)
        || nick.includes(content)
        || memberID === content;
      });

      console.log(members);

      if (members?.map((n) => n).length) {
        return Promise.resolve(members);
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Não encontrado');
    }
    return Promise.resolve(
      msg?.mentions?.members?.map((m: GuildMember) => guild?.members.cache.get(m.id)),
    );
  },
};
