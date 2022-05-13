/**
 * @Moderator
 * Interface that represents a server (guild) moderator
 * in the view of ur custom client.
 */

interface Moderator {
    id: string;
    customPermissions: string[]
    customGif: string
    chatMessages: number
    callTime: string
}

export default Moderator;
