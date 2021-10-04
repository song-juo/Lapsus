/* eslint-disable consistent-return */
import { GuildMember, Message } from 'discord.js';

export default {
  name: 'mentions',
  resolve: async (msg: Message, content: string = '854548450603565097', bot: boolean = false) => {
    const { guild }: Message = msg;
    const rawMentions = msg?.mentions?.members?.map((m) => m).length;
    /**
    * @cache  { External (discord.js lib) }:
    * Finding users locally trough already downloaded data
    */
    if (!rawMentions) {
      const members = guild?.members.cache.filter((m): m is GuildMember => {
        if (!bot && m.user.bot) return false;
        const name = m.user.username.toLowerCase();
        const nick = m.nickname ? m.nickname.toLowerCase() : name;
        const discrim = m.user.discriminator;
        // const memberID = m.user.id;

        return name === content || nick === content
        || `${name}#${discrim}` === content
        || `${nick}#${discrim}` === content
        || name.includes(content)
        || nick.includes(content);
      });

      const memberArr = members?.map((n) => n);

      if (memberArr?.length) {
        return Promise.resolve(members);
      }

      /**
       * @fetch {External (discord.js lib)}
       * As Discord is no longer permitting all bots to
       * download the entire members list, we can request
       * an speficific user by passing his ID. It's used
       * here as an ULTIMATE resource.
       */

      if (!memberArr?.length) {
        console.log('Newresss');
        const newRes = await guild?.members?.fetch(content);
        if (newRes) {
          return Promise.resolve(newRes);
        }
      }

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Não encontrado');
    }
    return Promise.resolve(
      msg?.mentions?.members?.map((m: GuildMember) => guild?.members.cache.get(m.id)),
    );
  },
};
