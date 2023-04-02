import express from "express";
import ContactController from "./controllers/contact.controller.js";

const router = express.Router();

router.get("/", ContactController.getContact);
router.post("/", ContactController.createContact);
router.delete('/:id', ContactController.deleteAccount)

export default router;