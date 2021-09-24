import { PermissionResolvable } from 'discord.js';
import group from './Group';

export default interface staff {
  userID: string,
  groups: group[]
  customPermissions: PermissionResolvable[],
}

