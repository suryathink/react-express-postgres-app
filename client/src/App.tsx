import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { TaskDashboard } from "./components/TaskDashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <CssBaseline />
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
