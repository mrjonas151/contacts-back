import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
      };
    }
  }
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token faltando" });
    return; 
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number, email: string };
    req.user = decoded;
    next(); 
  } catch {
    res.status(401).json({ error: "Token inválido" });
    return; 
  }
}