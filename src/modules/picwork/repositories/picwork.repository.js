import db from "../../../databases/models";

const PicworkRepository = {
  findAll: async () =>
    await db.Picworks.findAll({
      order: [["created_at", "ASC"]],
    }),
  findOneById: async (id) => await db.Picworks.findByPk(id),
  create: async (data) => await db.Picworks.create(data),
  patchById: async (id, data) =>
    await db.Picworks.update(data, {
      where: {
        id: id,
      },
    }),
  deleteById: async (id) =>
    await db.Picworks.destroy({
      where: {
        id,
      },
    }),
  findAllAlbumImages: async (id) =>
    await db.AlbumImages.findAll({
      where: {
        picwork_id: id,
      },
      order: [["created_at", "ASC"]],
    }),
  findAlbumImagesById: async (id) => await db.AlbumImages.findByPk(id),
  createAlbumImages: async (data) => await db.AlbumImages.create(data),
  patchAlbumImagesById: async (id, data) =>
    await db.AlbumImages.update(data, {
      where: {
        id: id,
      },
    }),
  deleteAlbumImagesById: async (id) =>
    await db.AlbumImages.destroy({
      where: {
        id,
      },
    }),
};

export default PicworkRepository;
