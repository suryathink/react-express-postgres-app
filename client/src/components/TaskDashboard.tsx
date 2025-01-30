import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/task";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { EditTaskDialog } from "./EditTaskDialogue";

export const TaskDashboard: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { fetchTasks } = useTaskContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h3" component="h1">
          Todo Manager
        </Typography>
        <Box>
          <Typography variant="subtitle1" component="span" sx={{ mr: 2 }}>
            Welcome, {user?.name}
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      <Box sx={{ mb: 4 }}>
        <TaskForm onSubmit={() => {}} />
      </Box>
      <TaskList onEditTask={setSelectedTask} />
      <EditTaskDialog
        open={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </Container>
  );
};
