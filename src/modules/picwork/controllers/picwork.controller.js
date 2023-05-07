import PicworkService from "../services/picwork.service.js";
import multer from "multer";
import { multerConfig, keyUpload } from "../../../config/multer.js";
const upload = multer(multerConfig).single(keyUpload);

export default {
  async getPicworks(req, res) {
    const data = await PicworkService.findAll();
    res.status(200).json({
      success: true,
      data,
    });
  },
  async getPicworkById(req, res) {
    const { id } = req.params;
    const data = await PicworkService.findOneById(+id);
    res.status(200).json({
      success: true,
      data: data ? data : {},
    });
  },
  async createPicwork(req, res) {
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await PicworkService.create(req.body, req.file);
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
  async patchPicwork(req, res) {
    const { id } = req.params;
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await PicworkService.patchById(+id, req.body, req.file);
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
  async deletePicwork(req, res) {
    const { id } = req.params;
    const puestion = await PicworkService.deleteById(+id);
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
  async getAlbumImages(req, res) {
    const { id } = req.params;
    const data = await PicworkService.findAllAlbumImages(+id);
    res.status(200).json({
      success: true,
      data,
    });
  },
  async createAlbumImages(req, res) {
    const { id } = req.params;
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await PicworkService.createAlbumImages(id, req.body, req.file);
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
  async patchAlbumImages(req, res) {
    const { id } = req.params;
    upload(req, res, async (error) => {
      if (error) {
        console.log(`error: ${JSON.stringify(error)}`);
        return res.status(500).json({
          success: true,
          message: error,
        });
      }
      const data = await PicworkService.patchAlbumImagesById(+id, req.body, req.file);
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
  async deleteAlbumImages(req, res) {
    const { id } = req.params;
    const puestion = await PicworkService.deleteAlbumImagesById(+id);
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
