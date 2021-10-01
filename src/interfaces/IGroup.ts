import { PermissionResolvable } from 'discord.js';
import Moderator from './IModerator';

export default interface Group {
    name: string
    createdAt: Date
    members: Moderator[]
    permissions: PermissionResolvable[]
}
