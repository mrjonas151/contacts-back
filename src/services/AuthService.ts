import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(AppDataSource.getRepository(User));
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email já em uso");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedPassword;

    return this.userRepository.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return { token };
  }
}