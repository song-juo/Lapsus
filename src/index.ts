import dotenv from 'dotenv';
import SelenaClient from './SelenaClient';

dotenv.config();

// eslint-disable-next-line no-unused-vars
const client: SelenaClient = new SelenaClient({
  administrators: ['263477867608801280'],
  token: process.env.TOKEN as string,
});
