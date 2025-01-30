import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, Typography, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, validateToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    try {
      await login({ email, password });
      navigate("/tasks");
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken();
      navigate("/tasks");
    }
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          error={email === ""}
          helperText={email === "" ? "Email is required" : ""}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          error={password === ""}
          helperText={password === "" ? "Password is required" : ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          disabled={loading || !email.trim() || !password.trim()}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Typography align="center">
          Don't have an account?{" "}
          <Link href="/register" underline="hover">
            Register here
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};
