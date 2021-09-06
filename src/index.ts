import dotenv from 'dotenv';
import NezumiClient from './NezumiClient';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const client: NezumiClient = new NezumiClient({
  administrators: ['756656368852795452'],
  token: process.env.TOKEN as string,
});
