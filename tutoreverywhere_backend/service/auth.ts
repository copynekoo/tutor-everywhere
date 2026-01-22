import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { findUserByUsername } from "../controllers/users.ts";

type UserAuthData = {
  userId: string;
  role: string;
};
let secretKey = process.env.AUTH_SECRET_KEY || "defaultKey";

// Controllers
const sign = function (data: UserAuthData) {
  let token = jwt.sign(data, secretKey, {
    expiresIn: "1d",
  });
  return token;
};

// Server
const authService = express.Router();

authService.use(bodyParser.json());
authService.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user)
      return res
        .status(401)
        .json({ error: "Invalid credentials or user does not exist" });
    // Verify if password is correct
    const hashedPassword = user.password;
    const verifyPassword = await bcrypt.compare(password, hashedPassword);
    if (!verifyPassword)
      return res
        .status(401)
        .json({ error: "Invalid credentials or user does not exist" });

    const token = sign({ userId: user.user_uuid, role: user.role });
    const decoded = jwt.decode(token);
    res.status(200).json({ token: token });
  } catch {
    res.status(500).json({ error: "Auth Service Error" });
  }
});

console.log("Auth service run");

export default authService;
