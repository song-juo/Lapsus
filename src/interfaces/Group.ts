import { PermissionResolvable } from 'discord.js';
import Moderator from './Moderator';

interface IGroup {
    id: string
    name: string
    createdAt: Date
    members: Moderator[]
    permissions: PermissionResolvable[]
}

export default IGroup;
