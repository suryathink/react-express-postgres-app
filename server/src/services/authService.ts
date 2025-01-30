import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

class AuthService {
  async register(name: string, email: string, password: string) {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: "Email already exists",
        };
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          status: StatusCodes.UNAUTHORIZED,
          message: "Invalid credentials",
        };
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw {
          status: StatusCodes.UNAUTHORIZED,
          message: "Invalid credentials",
        };
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
