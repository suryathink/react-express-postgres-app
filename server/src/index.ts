import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./configs/database";
import { routes } from "./routes/index";

dotenv.config();

console.log(
  "password",
  process.env.PG_PASSWORD,
  typeof process.env.PG_PASSWORD
);

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT!;

async function startServer() {
  try {
    await sequelize.sync();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
