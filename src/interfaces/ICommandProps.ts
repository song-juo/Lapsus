import { GuildMember, PermissionResolvable } from 'discord.js';
import NezumiClient from '../NezumiClient';
import IGuild from './IGuild';
import IModerator from './IModerator';

export default interface CommandProps {
    name: string
    description: string
    usage: string
    category: string
    cooldown: number
    aliases: Array<string>
    botPerms: PermissionResolvable
    userPerms: PermissionResolvable
}
