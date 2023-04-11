import { isEmpty } from "lodash";
import multer from "multer";
import { multerConfig, keyUpload } from "../../../config/multer.js";
import AccountService from "../services/account.service";

const upload = multer(multerConfig).single(keyUpload);

export default {
  getAccount: async (req, res) => {
    let queries = ""
    if (!isEmpty(req.query.query) && JSON.parse(req.query.query).role) {
      queries = JSON.parse(req.query.query)
    }
    const data = await AccountService.findAll(queries);
    res.status(200).json({
      success: true,
      data,
    });
  },
  getAccountById: async (req, res) => {
    const { id } = req.params;
    const data = await AccountService.findOneById(id);
    res.status(200).json({
      success: true,
      data: data ? data : {},
    });
  },
  register: (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await AccountService.register(req.body, req.file);
      if (!data) {
        res.status(403).json({
          success: false,
          data,
        });
      } else {
        res.status(201).json({
          success: true,
          data,
        });
      }
    });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const token = await AccountService.login(username, password);
    if (!token) {
      res.status(401).json({
        success: true,
        data: "invalid username or password",
      });
    } else {
      res.status(200).json({
        success: true,
        token: token,
      });
    }
  },
  profileInfo: (req, res) => {
    res.status(200).json({
      success: true,
      accountId: req.accountId,
      fullname: req.fullname,
      email: req.email,
      image: req.image,
      username: req.sub,
      role: req.role,
    });
  },
  patchAccount(req, res) {
    const { id } = req.params;

    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await AccountService.updateById(id, req.body, req.file);
      if (data) {
        res.status(201).json({
          success: true,
          data,
        });
      } else {
        res.status(204).json({
          success: false,
        });
      }
    });
  },
  deleteAccount: async (req, res) => {
    const { id } = req.params;
    const puestion = await AccountService.deleteById(id);
    if (puestion) {
      res.status(200).json({
        success: true,
        data: puestion,
      });
    } else {
      res.status(204).json({
        success: false,
      });
    }
  },
};
