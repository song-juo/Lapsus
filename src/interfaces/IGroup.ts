import { PermissionResolvable } from 'discord.js';
import Moderator from './IModerator';

export default interface Group {
    id: string
    name: string
    createdAt: Date
    members: Moderator[]
    permissions: PermissionResolvable[]
}
