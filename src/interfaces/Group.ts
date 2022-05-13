import { PermissionResolvable } from 'discord.js';
import Moderator from './IModerator';

interface IGroup {
    id: string
    name: string
    createdAt: Date
    members: Moderator[]
    permissions: PermissionResolvable[]
}

export default IGroup;
