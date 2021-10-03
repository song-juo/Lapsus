import { Collection } from 'discord.js';
import IGuild, { serverModeration } from '../interfaces/IGuild';
import IGroup from '../interfaces/IGroup';
import IModerator from '../interfaces/IModerator';
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
      const memberCollection: Collection<string, IMember> = new Collection();
      const groupCollection: Collection<string, IGroup> = new Collection();
      const staffCollection: Collection<string, IModerator> = new Collection();

      this.members.forEach((user) => {
        memberCollection.set(user.id, user);
      });

      this.moderation.groups.forEach((group) => {
        groupCollection.set(group.id, group);
      });

      this.moderation.staffs.forEach((staff) => {
        staffCollection.set(staff.id, staff);
      });

      this.members = memberCollection;
      this.moderation.groups = groupCollection;
      this.moderation.staffs = staffCollection;

      return this;
    }
}

/*
export interface IGuild {

}
*/
