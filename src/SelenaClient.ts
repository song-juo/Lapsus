import { Client, ClientOptions, Collection } from 'discord.js';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import moment from 'moment';
import SCache from './structures/Cache';
import Database from './structures/Database';
import Command from './structures/Command';

interface NezumiOptions extends ClientOptions {
    moderators?: Array<string>,
    curators?: Array<string>,
    token: string,
    administrators: Array<string>,
}

export default class SelenaClient extends Client {
    public commands: Collection<unknown, unknown>;

    public cache: SCache;

    public database: Database;

    constructor(clientOptions?: NezumiOptions) {
      super(clientOptions);
      this.commands = new Collection();

      this.loadCommands();
      this.loadEvents();

      this.login(clientOptions!.token);

      this.cache = new SCache(this);
      this.database = new Database(this);
    }

    async login(token: string): Promise<any> {
      try {
        await super.login(token);
      } catch (error) {
        this.log('error', error as string);
      }
    }

    async loadCommands() {
      glob(path.join(__dirname, '/commands/**/*.js'), {}, async (_er, files) => {
        files.forEach(async (file) => {
          const CommandImport: any = await import(file);
          const ComandoDefault: any = CommandImport.default;
          const cmd: Command = new ComandoDefault(this);

          this.commands.set(cmd.name, cmd);

          if (cmd.aliases !== []) {
            cmd.aliases
              .forEach((alias: string) => {
                this.commands.set(alias, cmd);
              });
          }
        });
      });
      return this.log('info', 'Commands - Ok');
    }

    async loadEvents() {
      glob(path.join(__dirname, '/modules/**/*.js'), {}, async (_er, files) => {
        files.forEach(async (file) => {
          const EventImport: any = await import(file);
          const EventDefault: any = EventImport.default;
          const event = new EventDefault(this);

          super.on(event.trigger, (...args: any) => event.run(...args));
        });
        return this.log('info', 'Modules - Ok');
      });
    }

    async log(type: string, message: string) {
      const clock = `📖 [${chalk.cyan.bold(moment(new Date()).format('HH:mm:ss'))}]:`;

      switch (type) {
        case 'info':
          console.log(clock, chalk.whiteBright.bold(message));
          break;
        case 'warn':
          console.log(clock, chalk.grey(message));
          break;
        case 'error':
          console.log(clock, chalk.red.bold(message));
          break;
        case 'success':
          console.log(clock, chalk.green.bold(message));
          break;
        default:
          console.log(chalk.gray(clock, message));
      }

      return this;
    }
}
