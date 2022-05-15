import { Message } from 'discord.js';
import { Responder, SReply } from '../interfaces/Responder';

class Fluency implements Responder {
    public msg: Message

    private language: string

    constructor(options: object) {}
}

export default Fluency;
