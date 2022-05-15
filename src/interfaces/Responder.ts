import { GuildMember, Message, MessageEmbed } from 'discord.js';

export interface SReply {
    content: string | MessageEmbed
    expiration: number | null | undefined
    prefix: 'danger' | 'error' | 'success' | 'info' | 'help'
}

export interface SResponder {
    locale: 'pt-BR' | 'en-US'
    msg: Message
    member: GuildMember
    reply: Promise<boolean>
}
