import { StatusCodes } from "http-status-codes";
import Task from "../models/Task";

export class TaskService {
  public static async createTask(
    userId: string,
    title: string,
    description: string
  ) {
    try {
      const task = await Task.create({
        userId,
        title,
        description,
      });
      return task;
    } catch (error) {
      throw {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error creating task",
      };
    }
  }

  public static async getTasks(userId: string) {
    try {
      const tasks = await Task.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
      });
      return tasks;
    } catch (error) {
      throw {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error fetching tasks",
      };
    }
  }

  public static async updateTask(
    taskId: string,
    userId: string,
    title: string,
    description: string
  ) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Task not found",
        };
      }

      await task.update({ title, description });
      return task;
    } catch (error) {
      throw {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error updating task",
      };
    }
  }

  public static async deleteTask(taskId: string, userId: string) {
    try {
      const task = await Task.findOne({
        where: { id: taskId, userId },
      });

      if (!task) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Task not found",
        };
      }

      await task.destroy();
    } catch (error) {
      throw {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error deleting task",
      };
    }
  }
}
