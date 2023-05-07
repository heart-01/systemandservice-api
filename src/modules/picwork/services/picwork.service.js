import PicworkRepository from "../repositories/picwork.repository.js";

const PicworkService = {
  findAll: async () => await PicworkRepository.findAll(),
  findOneById: async (id) => await PicworkRepository.findOneById(id),
  create: async (data, file) => {
    await PicworkRepository.create({ ...data, image_album: file ? file.filename : "" });
    return await PicworkRepository.findAll();
  },
  patchById: async (id, data, file) => {
    const result = await PicworkRepository.findOneById(id);
    if (result) {
      const updated = await PicworkRepository.patchById(result.id, { ...data, image_album: file ? file.filename : result.image_album });
      if (updated) {
        return await PicworkRepository.findOneById(id);
      }
    }
    return null;
  },
  deleteById: async (id) => {
    const result = await PicworkRepository.findOneById(id);
    if (result) {
      const deleted = await PicworkRepository.deleteById(id);
      if (deleted) {
        return await PicworkRepository.findAll();
      }
    }
    return false;
  },
  findAllAlbumImages: async (id) => await PicworkRepository.findAllAlbumImages(id),
  createAlbumImages: async (id, data, file) => await PicworkRepository.createAlbumImages({ picwork_id: id, ...data, image_album: file ? file.filename : "" }),
  patchAlbumImagesById: async (id, data, file) => {
    const result = await PicworkRepository.findAlbumImagesById(id);
    if (result) {
      const updated = await PicworkRepository.patchAlbumImagesById(result.id, { ...data, image_album: file ? file.filename : result.image_album });
      if (updated) {
        return await PicworkRepository.findAlbumImagesById(id);
      }
    }
    return null;
  },
  deleteAlbumImagesById: async (id) => {
    const result = await PicworkRepository.findAlbumImagesById(id);
    if (result) {
      const deleted = await PicworkRepository.deleteAlbumImagesById(id);
      if (deleted) {
        return true;
      }
    }
    return false;
  },
};

export default PicworkService;
