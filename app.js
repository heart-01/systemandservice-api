import express from "express";
import cors from "cors";
import routes from "./src/routes/routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const env = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3030;
const corsOptions = {
  origin: ["http://localhost:3000", "https://sw-systemandservice.com"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use("/images", express.static("./images"));

app.listen(PORT, () => {
  console.log(`ENV on ${env}`);
  console.log("SW SYSTEMS & SERVICE is running on port", PORT);
});

export default app;
