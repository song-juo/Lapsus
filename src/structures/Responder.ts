import { GuildMember, Message } from 'discord.js';
import { SReply, SResponder, responseDecorator } from '../interfaces/Responder';
import GuildData from './GuildData';

class Fluency implements SResponder {
    public msg: Message

    public guildData: GuildData

    public member: GuildMember

    public contentFormats: responseDecorator[]

    constructor(props: SResponder) {
      this.msg = props.msg;
      this.member = props.member;
      this.guildData = props.guildData;

      this.contentFormats = [
        { type: 'danger', format: (data: string) => `⚠ **|** ${this.member} ${data}` },
        { type: 'error', format: (data: string) => `🧨 **|** ${this.member} ${data}` },
        { type: 'success', format: (data: string) => `✨ **|** ${this.member} ${data}` },
        { type: 'info', format: (data: string) => `💭 **|** ${this.member} ${data}` },
      ];
    }

    async reply(args: SReply): Promise<void> {
      const { content, prefix } = args;

      const formatted = typeof content === 'string'
        ? this.formatReply(content, prefix)
        : content;

      this.msg.channel.send(formatted);
    }

    formatReply(content: string, prefix: string): string {
      const messageForm = this.contentFormats.find((f: responseDecorator) => f.type === prefix);
      return messageForm.format(content);
    }
}

export default Fluency;
