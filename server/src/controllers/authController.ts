import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import authService from "../services/authService";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

class AuthController {
  async register(req: Request, res: Response) {
    try {
      await userSchema.validate(req.body);
      const { name, email, password } = req.body;
      const { user, token } = await authService.register(name, email, password);
      res.status(StatusCodes.CREATED).json({ user, token });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
        });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      await loginSchema.validate(req.body);
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: error.message,
        });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
}

export default new AuthController();
