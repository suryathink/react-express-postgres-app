import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { AuthService } from "../services/authService";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      await userSchema.validate(req.body);
      const { name, email, password } = req.body;
      const { user } = await AuthService.register(
        name.toString(),
        email.toString(),
        password.toString()
      );
      res.status(StatusCodes.CREATED).json({ user });
    } catch (error: any) {
      console.log("error", error);
      res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Internal server error",
      });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      await loginSchema.validate(req.body);
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(StatusCodes.OK).json({ user, token });
    } catch (error: any) {
      console.log("error", error);
      res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Internal server error",
      });
    }
  }
  public static async ValidateToken(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ success: true });
    } catch (error: any) {
      console.log("error", error);
      res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Internal server error",
      });
    }
  }
}
