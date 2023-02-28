import db from "../../../databases/models";

const PublicizeRepository = {
  findAll: async () =>
    await db.publicize.findAll({
      order: [["created_at", "ASC"]],
    }),
  findOneById: async (id) => await db.publicize.findByPk(id),
  create: async (data) => await db.publicize.create(data),
  patchById: async (id, data) =>
    await db.publicize.update(data, {
      where: {
        id: id,
      },
    }),
  deleteById: async (id) =>
    await db.publicize.destroy({
      where: {
        id,
      },
    }),
};

export default PublicizeRepository;
