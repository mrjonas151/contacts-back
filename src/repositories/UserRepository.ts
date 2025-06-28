import { Repository } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
  private repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  create(userData: Partial<User>): User {
    return this.repository.create(userData);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    await this.repository.save(user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}