import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já em uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = userRepo.create({ name, email, password: hashedPassword });
    await userRepo.save(newUser);

    return res.status(201).json({ message: "User registrado com sucesso" });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { email } });

    if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.json({ token });
  }
}
