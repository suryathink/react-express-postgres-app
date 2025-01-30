import express from "express";
import { TaskController } from "../controllers/taskController";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.use(auth);

router.post("/", TaskController.createTask as any);
router.get("/", TaskController.getTasks);
router.put("/:id", TaskController.updateTask as any);
router.delete("/:id", TaskController.deleteTask);

export default router;
