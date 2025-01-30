import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { Task, CreateTaskInput } from "../types/task";
import toast from "react-hot-toast";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTaskInput) => Promise<void>;
  updateTask: (id: string, task: CreateTaskInput) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// const API_URL = "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL;

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/v1/todo`, config);
      setTasks(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(
    async (task: CreateTaskInput) => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        await axios.post(`${API_URL}/api/v1/todo`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        await fetchTasks();
        toast.success("Task created successfully");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An error occurred";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks]
  );

  const updateTask = useCallback(
    async (id: string, task: CreateTaskInput) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found.");
        }
        setLoading(true);
        await axios.put(`${API_URL}/api/v1/todo/${id}`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        await fetchTasks();
        toast.success("Task updated successfully");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An error occurred";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks]
  );
  const deleteTask = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`${API_URL}/api/v1/todo/${id}`, config);
        await fetchTasks();
        toast.success("Task deleted successfully");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An error occurred";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
