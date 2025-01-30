import express from "express";
import { AuthController } from "../../controllers/authController";
import { auth } from "../../middlewares/auth";
const router = express.Router();

router.post("/register", AuthController.register as any);
router.post("/login", AuthController.login as any);
router.get("/validate-token", auth, AuthController.ValidateToken as any);

export default router;
