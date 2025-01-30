import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./configs/database";
import { routes } from "./routes/index";

dotenv.config();

const app: Express = express(); // Initialize the Express app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

routes(app);

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
