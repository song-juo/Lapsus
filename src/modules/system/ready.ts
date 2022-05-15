import SelenaClient from '../../SelenaClient';

export default class Ready {
    private client: SelenaClient;

    public trigger: string = 'ready';

    constructor(client: SelenaClient) {
      this.client = client;
    }

    run() {
      this.client.log('success', `${this.client.user?.username} connected to discord servers. 🎩`);
    }
}
