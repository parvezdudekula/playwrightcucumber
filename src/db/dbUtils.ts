import { Client } from 'pg';

export async function queryDB(query: string, params?: any[]) {
  const client = new Client({
    user: 'user', // Replace with your DB user
    host: 'localhost',
    database: 'yourdb', // Replace with your DB name
    password: 'yourpassword', // Replace with your DB password
    port: 5432,
  });
  await client.connect();
  const res = await client.query(query, params);
  await client.end();
  return res.rows;
}
