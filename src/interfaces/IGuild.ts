import { Collection } from 'discord.js';
import group from './IGroup';
import IMember from './IMember';
import moderator from './IModerator';

export interface serverModeration {
    staffs: moderator[],
    groups: group[]
}

export interface IGuild {
    id: string
    prefix: string
    settings: JSON
    moderation: serverModeration
    members: Collection<string, IMember>
    blacklisted: JSON
}