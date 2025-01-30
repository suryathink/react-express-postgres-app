import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/task";

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const { tasks, loading, deleteTask } = useTaskContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          No tasks found. Add your first task!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3}>
      <List>
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            divider={index < tasks.length - 1}
            secondaryAction={
              <Box>
                <IconButton edge="end" onClick={() => onEditTask(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
