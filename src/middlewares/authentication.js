import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const privateKey = fs.readFileSync(
  path.join(__dirname, "../../s4t", "private.key")
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../../s4t", "public.key")
);

const signOptions = {
  issuer: "systemandservice",
  audience: "https://sw-systemandservice.com",
  algorithm: "RS256",
};

const generateToken = (payload) =>
  jwt.sign(payload, privateKey, {
    ...signOptions,
    expiresIn: "30d",
  });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json();
    return;
  }

  jwt.verify(token, publicKey, signOptions, (error, decode) => {
    if (error) {
      res.status(401).json();
      return;
    }

    req.accountId = decode.accountId;
    req.fullname = decode.fullname;
    req.email = decode.email;
    req.image = decode.image;
    req.sub = decode.sub;
    req.role = decode.role;

    next();
  });
};

export default {
  generateToken,
  verifyToken,
};
