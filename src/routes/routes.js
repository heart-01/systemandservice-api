import express from "express";
import QuestionRouter from "../modules/question/question.route.js";
import AccountRouter from "../modules/account/account.route.js";
import ContactRouter from "../modules/contact/contact.route.js";
import CustomerRouter from "../modules/customer/customer.route.js";
import ProductRouter from "../modules/product/product.route.js";
import SaleRouter from "../modules/sale/sale.route.js";
import PicworkRouter from "../modules/picwork/picwork.route.js";
import RepairRouter from "../modules/repair/repair.route.js";
import PublicizeRouter from "../modules/publicize/publicize.route.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`SW SYSTEMS & SERVICE is running`);
});

// Route
router.use("/api/question", QuestionRouter);
router.use("/api/account", AccountRouter);
router.use("/api/contact", ContactRouter);
router.use("/api/customer", CustomerRouter);
router.use("/api/product", ProductRouter);
router.use("/api/sale", SaleRouter);
router.use("/api/picwork", PicworkRouter);
router.use("/api/repair", RepairRouter);
router.use("/api/publicize", PublicizeRouter);

export default router;
