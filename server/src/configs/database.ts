import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.PG_DB!,
  username: process.env.PG_USER!,
  password: process.env.PG_PASSWORD!,
  host: process.env.PG_HOST!,
  port: Number(process.env.PG_PORT!) || 5432,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
