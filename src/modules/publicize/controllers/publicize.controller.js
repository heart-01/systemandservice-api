import PublicizeService from "../services/publicize.service.js";
import multer from "multer";
import { multerConfig, keyUpload } from "../../../config/multer.js";
const upload = multer(multerConfig).single(keyUpload);

export default {
  async getPublicizes(req, res) {
    const data = await PublicizeService.findAll();
    res.status(200).json({
      success: true,
      data,
    });
  },
  async getPublicizeById(req, res) {
    const { id } = req.params;
    const data = await PublicizeService.findOneById(+id);
    res.status(200).json({
      success: true,
      data: data ? data : {},
    });
  },
  async createPublicize(req, res) {
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await PublicizeService.create(req.body, req.file);
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
  async patchPublicize(req, res) {
    const { id } = req.params;
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await PublicizeService.patchById(+id, req.body, req.file);
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
  async deletePublicize(req, res) {
    const { id } = req.params;
    const puestion = await PublicizeService.deleteById(+id);
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
