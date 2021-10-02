import { Collection } from 'discord.js';
import { IGuild, serverModeration } from '../interfaces/IGuild';
import IMember from '../interfaces/IMember';

export default class GuildData implements IGuild {
    public id: string

    public prefix: string

    public settings: JSON

    public moderation: serverModeration

    public members: Collection<string, IMember>

    public blacklisted: JSON

    constructor(baseData: IGuild) {
      this.id = baseData.id;
      this.prefix = baseData.prefix;
      this.settings = baseData.settings;
      this.moderation = baseData.moderation;
      this.members = baseData.members;
      this.blacklisted = baseData.blacklisted;
    }

    fillCollections() {
      const memberCollection = new Collection();
      const groupCollection = new Collection();
      const staffCollection = new Collection();

      this.members.forEach((user) => {
        memberCollection.set(user.id, user);
      });

      return memberCollection;
    }
}

/*
export interface IGuild {

}
*/
