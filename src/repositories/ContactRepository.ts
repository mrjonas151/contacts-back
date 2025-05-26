import { Repository } from "typeorm";
import { Contact } from "../entities/Contact";

export class ContactRepository {
  private repository: Repository<Contact>;

  constructor(repository: Repository<Contact>) {
    this.repository = repository;
  }

  create(contactData: Partial<Contact>): Contact {
    return this.repository.create(contactData);
  }

  async save(contact: Contact): Promise<Contact> {
    return this.repository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Contact | null> {
    return this.repository.findOneBy({ id: Number(id) });
  }

  async remove(contact: Contact): Promise<Contact> {
    return this.repository.remove(contact);
  }
}