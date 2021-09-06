import NezumiClient from '../../NezumiClient';

export default class Ready {
    private client: NezumiClient;

    public trigger: string = 'ready';

    constructor(client: NezumiClient) {
      this.client = client;
    }

    run() {
      this.client.log('success', `${this.client.user?.username} connected to discord servers. 🎩`);
    }
}
