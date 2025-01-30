import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { User, AuthResponse, LoginInput, RegisterInput } from "../types/auth";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  validateToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const API_URL = "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuthResponse = ({ user, token }: AuthResponse) => {
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const login = useCallback(async (data: LoginInput) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/v1/user/login`, data);
      handleAuthResponse(response.data);
      toast.success("Logged in successfully");
    } catch (err: any) {
      let message = "An error occurred";
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterInput) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/v1/user/register`, data);
      toast.success("Registered successfully");
    } catch (err: any) {
      let message = "An error occurred";

      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const validateToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Login again!");
      }

      const response = await axios.get(
        `${API_URL}/api/v1/user/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (err: any) {
      let message = "An error occurred";
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      // toast.error(message);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
