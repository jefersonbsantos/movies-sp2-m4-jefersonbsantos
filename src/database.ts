import "dotenv/config";
import { Client } from "pg";

const client: Client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB),
  database: process.env.DB,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connnected");
};

export { client, connectDatabase };
