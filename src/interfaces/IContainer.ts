import { GuildMember } from 'discord.js';
import NezumiClient from '../NezumiClient';
import IGuild from './IGuild';
import IModerator from './IModerator';

export default interface Container {
    member: GuildMember
    client: NezumiClient
    args: Array<string>
    guildData: IGuild
    moderatorData?: IModerator
}
