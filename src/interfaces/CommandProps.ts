import { PermissionResolvable } from 'discord.js';

interface CommandProps {
    name: string
    description: string
    usage: string
    category: string
    cooldown: number
    aliases: Array<string>
    botPerms: PermissionResolvable
    userPerms: PermissionResolvable
}

export default CommandProps;
