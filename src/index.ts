import dotenv from 'dotenv';
import SelenaClient from './SelenaClient';

dotenv.config();

const connection = new SelenaClient({
  administrators: ['263477867608801280'],
  token: process.env.TOKEN as string,
});

export default connection;
