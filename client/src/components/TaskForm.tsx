import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";

interface TaskFormProps {
  onSubmit: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useTaskContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await createTask({ title, description });
    setTitle("");
    setDescription("");
    onSubmit();
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          error={title === ""}
          helperText={title === "" ? "Title is required" : ""}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          required
          multiline
          rows={3}
          error={description === ""}
          helperText={description === "" ? "Description is required" : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!title.trim() || !description.trim()}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};
