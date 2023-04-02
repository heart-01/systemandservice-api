import ContactRepository from "../repositories/contact.repository.js";

const ContactService = {
  findAll: async () => await ContactRepository.findAll(),
  findOneById: async (id) => await ContactRepository.findOneById(id),
  create: async (data) => {
    await ContactRepository.create({ ...data });
    return await ContactRepository.findAll();
  },
  deleteById: async (id) => {
    const result = await ContactRepository.findOneById(id);
    if (result) {
      const deleted = await ContactRepository.deleteById(id);
      if (deleted) {
        return await ContactRepository.findAll();
      }
    }
    return false;
  },
};

export default ContactService;
