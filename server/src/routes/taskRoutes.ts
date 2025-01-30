import express from "express";
import { TaskController } from "../controllers/taskController"; // ✅ Correct named import
import { auth } from "../middlewares/auth";

const router = express.Router();

router.use(auth);

router.post("/", TaskController.createTask);
router.get("/", TaskController.getTasks);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
