import express from "express";
import bodyParser from "body-parser";
import { findUserByUserId } from "../controllers/users.ts";
import { verifyToken } from "../middleware/verify.ts";

// Server
const userService = express.Router();

userService.use(bodyParser.json());
userService.get("/me", verifyToken, async (req, res) => {
  res.status(200).json(req.body);
});

console.log("User service run");

export default userService;
