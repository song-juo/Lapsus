import { GuildMember } from 'discord.js';
import SelenaClient from '../SelenaClient';
import { SGuild } from './Guild';
import IModerator from './Moderator';

interface Container {
    client: SelenaClient
    guildData: SGuild
    args: string[]
    member: GuildMember
    moderatorData?: IModerator
}

export default Container;
