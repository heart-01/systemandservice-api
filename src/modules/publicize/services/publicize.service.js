import PublicizeRepository from "../repositories/publicize.repository.js";

const PublicizeService = {
  findAll: async () => await PublicizeRepository.findAll(),
  findOneById: async (id) => await PublicizeRepository.findOneById(id),
  create: async (data, file) => {
    await PublicizeRepository.create({ ...data, image: file ? file.filename : "" });
    return await PublicizeRepository.findAll();
  },
  patchById: async (id, data, file) => {
    const result = await PublicizeRepository.findOneById(id);
    if (result) {
      const updated = await PublicizeRepository.patchById(result.id, { ...data, image: file ? file.filename : result.image });
      if (updated) {
        return await PublicizeRepository.findOneById(id);
      }
    }
    return null;
  },
  deleteById: async (id) => {
    const result = await PublicizeRepository.findOneById(id);
    if (result) {
      const deleted = await PublicizeRepository.deleteById(id);
      if (deleted) {
        return await PublicizeRepository.findAll();
      }
    }
    return false;
  },
};

export default PublicizeService;
