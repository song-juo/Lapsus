import { Collection } from 'discord.js';
import { SGuild, serverModeration } from '../interfaces/Guild';
import Group from '../interfaces/Group';
import Moderator from '../interfaces/Moderator';
import { SMember } from '../interfaces/SMember';

class GuildData implements SGuild {
    public id: string

    public prefix: string

    public settings: JSON

    public moderation: serverModeration

    public members: Collection<string, SMember>

    public blacklisted: JSON

    constructor(baseData: SGuild) {
      this.id = baseData.id;
      this.prefix = baseData.prefix;
      this.settings = baseData.settings;
      this.moderation = baseData.moderation;
      this.members = baseData.members;
      this.blacklisted = baseData.blacklisted;
    }

    fillCollections() {
      const memberCollection: Collection<string, SMember> = new Collection();
      const groupCollection: Collection<string, Group> = new Collection();
      const staffCollection: Collection<string, Moderator> = new Collection();

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

export default GuildData;
