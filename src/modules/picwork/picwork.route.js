import express from "express";
import PicworkController from "./controllers/picwork.controller.js";

const router = express.Router();

router.get("/albumImages/:id", PicworkController.getAlbumImages);
router.post("/albumImages/:id", PicworkController.createAlbumImages);
router.patch("/albumImages/:id", PicworkController.patchAlbumImages);
router.delete("/albumImages/:id", PicworkController.deleteAlbumImages);
router.get("/", PicworkController.getPicworks);
router.get("/:id", PicworkController.getPicworkById);
router.post("/", PicworkController.createPicwork);
router.patch("/:id", PicworkController.patchPicwork);
router.delete("/:id", PicworkController.deletePicwork);

export default router;
