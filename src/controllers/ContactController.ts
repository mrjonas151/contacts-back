import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Contact } from "../entities/Contact";
import { ContactRepository } from "../repositories/ContactRepository";

export class ContactController {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository(AppDataSource.getRepository(Contact));
  }

  async create(req: Request, res: Response) {
    const { name, email, phone, favorite } = req.body;
    const userId = req.user.id;

    const contact = this.contactRepository.create({ name, email, phone, favorite, userId });
    await this.contactRepository.save(contact);

    return res.status(201).json(contact);
  }

  async getAll(req: Request, res: Response) {
    const userId = req.user.id;
    const contacts = await this.contactRepository.findByUserId(userId);
    return res.json(contacts);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.json(contact);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;

    const contact = await this.contactRepository.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.favorite = favorite;

    await this.contactRepository.save(contact);
    return res.json(contact);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const contact = await this.contactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    await this.contactRepository.remove(contact);
    return res.status(204).send();
  }
}