import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import TaskService from "../services/taskService";

const taskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

export class TaskController {
  public static async createTask(req: Request, res: Response) {
    try {
      await taskSchema.validate(req.body);
      const { title, description } = req.body;
      const userId = req.user!.id;

      const task = await TaskService.createTask(userId, title, description);
      res.status(StatusCodes.CREATED).json(task);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
        });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }

  public static async getTasks(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const tasks = await TaskService.getTasks(userId);
      res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }

  public static async updateTask(req: Request, res: Response) {
    try {
      await taskSchema.validate(req.body);
      const { title, description } = req.body;
      const { id: taskId } = req.params;
      const userId = req.user!.id;

      const task = await TaskService.updateTask(
        taskId,
        userId,
        title,
        description
      );
      res.status(StatusCodes.OK).json(task);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
        });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }

  public static async deleteTask(req: Request, res: Response) {
    try {
      const { id: taskId } = req.params;
      const userId = req.user!.id;

      await TaskService.deleteTask(taskId, userId);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
}
