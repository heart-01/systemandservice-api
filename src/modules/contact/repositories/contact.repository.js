import db from "../../../databases/models";

const ContactRepository = {
  findAll: async () =>
    await db.Contacts.findAll({
      order: [["id", "DESC"]],
    }),
  findOneById: async (id) => await db.Contacts.findByPk(id),
  create: async (data) => await db.Contacts.create(data),
  deleteById: async (id) =>
    await db.Contacts.destroy({
      where: {
        id,
      },
    }),
};

export default ContactRepository;
