// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { StatusCodes } from "http-status-codes";

// export const auth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: "Authentication invalid" });
//     return;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!);
//     req.user as any = payload; // ✅ Attach user to request
//     return next(); // ✅ Explicitly return next() so Express knows to proceed
//   } catch (error) {
//     res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ message: "Authentication invalid" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

// Extend Express Request type
interface AuthRequest extends Request {
  user?: { id: string };
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as
      | string
      | JwtPayload;

    // Ensure payload is an object before assigning
    if (typeof payload === "object" && "id" in payload) {
      req.user = { id: payload.id as string }; // ✅ Ensure type safety
      return next();
    }

    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid" });
  }
};
