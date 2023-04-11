import AccountRepository from "../repositories/account.repository.js";
import bcrypt from "bcrypt";
import auth from "../../../middlewares/authentication.js";

const AccountService = {
  findAll: async (query) =>
    await AccountRepository.findAll({ where: { ...query } }),
  findOneById: async (id) => await AccountRepository.findOneById(id),
  register: async (data, file) => {
    data.password = await bcrypt.hash(data.password, 8);
    const duplicate = await AccountRepository.findByUsername(data.username);
    if (!duplicate) {
      return await AccountRepository.create({
        ...data,
        image: file ? file.filename : "",
      });
    }
    return;
  },
  login: async (username, password) => {
    const result = await AccountRepository.findByUsername(username);
    if (result && (await bcrypt.compare(password, result.password))) {
      const payload = {
        sub: result.username,
        accountId: result.id,
        fullname: `${result.fname} ${result.lname}`,
        role: result.role,
        email: result.email,
        image: result.image,
      };
      return auth.generateToken(payload);
    }

    return;
  },
  updateById: async (id, data, file) => {
    const result = await AccountRepository.findOneById(id);
    if (result) {
      const updated = await AccountRepository.updateById(result.id, {
        ...data,
        image: file ? file.filename : result.image,
      });
      if (updated) {
        return await AccountRepository.findOneById(id);
      }
    }
    return null;
  },
  deleteById: async (id) => {
    const result = await AccountRepository.findOneById(id);
    if (result) {
      const deleted = await AccountRepository.deleteById(id);
      if (deleted) {
        return await AccountRepository.findAll();
      }
    }
    return false;
  },
};

export default AccountService;
