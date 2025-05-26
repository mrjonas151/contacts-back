import { AppDataSource } from "../config/data-source";
import { Contact } from "../entities/Contact";

export class ContactService {
  async createContact(contactData: Partial<Contact>): Promise<Contact> {
    const contactRepository = AppDataSource.getRepository(Contact);
    const contact = contactRepository.create(contactData);
    await contactRepository.save(contact);
    return contact;
  }

  async getContactById(id: number): Promise<Contact | null> {
    const contactRepository = AppDataSource.getRepository(Contact);
    return await contactRepository.findOneBy({ id });
  }

  async getAllContacts(): Promise<Contact[]> {
    const contactRepository = AppDataSource.getRepository(Contact);
    return await contactRepository.find();
  }

  async updateContact(id: number, contactData: Partial<Contact>): Promise<Contact | null> {
    const contactRepository = AppDataSource.getRepository(Contact);
    await contactRepository.update(id, contactData);
    return await this.getContactById(id);
  }

  async deleteContact(id: number): Promise<boolean> {
    const contactRepository = AppDataSource.getRepository(Contact);
    const result = await contactRepository.delete(id);
    return result.affected !== 0;
  }
}