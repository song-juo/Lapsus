import { Collection } from 'discord.js';
import group from './Group';
import { SMember } from './SMember';
import moderator from './Moderator';

export interface serverModeration {
    staffs: Collection<String, moderator>,
    groups: Collection<String, group>
}

export interface SGuild {
    id: string
    prefix: string
    settings: JSON
    moderation: serverModeration
    members: Collection<string, SMember>
    blacklisted: JSON
}
