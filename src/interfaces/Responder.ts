/* eslint-disable no-unused-vars */
import { GuildMember, Message, MessageEmbed } from 'discord.js';
import GuildData from '../structures/GuildData';

export interface responseDecorator {
    type: string
    format: (data: string) => string;
}

export interface SReply {
    content: string | MessageEmbed
    expiration: number | null | undefined
    prefix: 'danger' | 'error' | 'success' | 'info' | 'help'
}

export interface SResponder {
    readonly msg: Message
    readonly guildData: GuildData
    readonly member: GuildMember
}
