import group from './Group';
import moderator from './Moderator';

interface serverModeration {
    staffs: moderator[],
    groups: group[]
}

export interface NGuild {
    id: string
    prefix: string
    settings: JSON
    moderation: serverModeration
    members: JSON
    blacklisted: JSON
}

