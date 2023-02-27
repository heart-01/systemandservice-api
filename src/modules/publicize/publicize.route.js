import express from "express";
import PublicizeController from "./controllers/publicize.controller.js";

const router = express.Router();

router.get("/", PublicizeController.getPublicizes);
router.get("/:id", PublicizeController.getPublicizeById);
router.post("/", PublicizeController.createPublicize);
router.patch("/:id", PublicizeController.patchPublicize);
router.delete("/:id", PublicizeController.deletePublicize);

export default router;
