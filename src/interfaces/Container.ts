import { GuildMember } from 'discord.js';
import NezumiClient from '../NezumiClient';
import { SGuild } from './Guild';
import IModerator from './Moderator';

interface Container {
    member: GuildMember
    client: NezumiClient
    args: Array<string>
    guildData: SGuild
    moderatorData?: IModerator
}

export default Container;
