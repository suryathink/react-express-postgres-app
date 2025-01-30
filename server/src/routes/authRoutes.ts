import express from "express";
import AuthController from "../controllers/authController";

const router = express.Router();

router.post("/auth/register", AuthController.register as any);
router.post("/auth/login", AuthController.login as any);

export default router;
