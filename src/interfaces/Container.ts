import SelenaClient from '../SelenaClient';
import { SGuild } from './Guild';
import IModerator from './Moderator';

interface Container {
    client: SelenaClient
    guildData: SGuild
    moderatorData?: IModerator
}

export default Container;
