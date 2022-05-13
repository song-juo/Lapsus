import { Message, GuildMember, PermissionResolvable } from 'discord.js';
import moment from 'moment';
import chalk from 'chalk';
import NezumiClient from '../NezumiClient';
import NCache from './Cache';
import { SGuild } from '../interfaces/Guild';
import CommandProps from '../interfaces/CommandProps';
import IContainer from '../interfaces/Container';

export default abstract class Command implements CommandProps {
    public client: NezumiClient;

    public cache: NCache;

    public name: string;

    public description: string;

    public usage: string;

    public category: string;

    public aliases: Array<string>;

    public botPerms: PermissionResolvable;

    public userPerms: PermissionResolvable;

    public cooldown: number;

    constructor(client: NezumiClient, options: ICommandProps) {
      this.client = client;
      this.cache = this.client.cache;
      this.cooldown = options.cooldown;
      this.name = options.name;
      this.description = options.description;
      this.usage = options.usage;
      this.category = options.category;
      this.aliases = options.aliases;
      this.botPerms = options.botPerms;
      this.userPerms = options.userPerms;
    }

    // eslint-disable-next-line no-unused-vars
    abstract run(msg: Message, container: IContainer): Promise<any>;

    async check(msg: Message, args: Array<string>, member: GuildMember, guildData: SGuild) {
      const inCooldown: any = await this.cache.checkCooldown(this.name, member.id);
      const cooldown = moment().diff(moment(inCooldown), 'seconds');

      if (cooldown < 0) {
        await msg.channel.send(`${member} Calma aí, ainda faltam **${cooldown * -1}** segundos colega. >:C`);
        return;
      }

      if (!msg.member?.permissions.has(this.userPerms)) {
        await msg.channel.send(`${member} Você não tem permissões pra usar esse comando !`);
        return;
      }

      if (!msg.guild?.me?.permissions.has(this.botPerms)) {
        await msg.channel.send(`${member} Perdão, mas eu não possuo as permissões necessárias para executar este comando.`);
        return;
      }

      const toAdd = moment().add(this.cooldown, 'seconds').toISOString();

      await this.cache.removeCooldown(this.name, member.id);
      await this.cache.setCooldown(this.name, member.id, toAdd);

      console.log(`[${chalk.yellow.bold(moment(new Date()).format('HH:mm:ss'))}]: Comando ${chalk.redBright.bold(this.name)} usado por ${chalk.cyan.bold(member?.user.tag, `(${member.id})`)} em ${chalk.green.bold(msg.guild?.name, `(${msg.guild?.id})`)}`);

      // Handling subcommands

      await this.run(msg, {
        client: this.client, args, member, guildData,
      });
    }
}
