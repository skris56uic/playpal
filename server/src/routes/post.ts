import bcrypt from "bcryptjs";
import { RegisterRequest, LoginRequest } from "./interfaces";
import express, { Router } from "express";
import { userModel } from "../models/user";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/constants";

const router: Router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password }: RegisterRequest = req.body;
    const bcryptSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    const userDoc = await userModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, hashedPassword),
      bookedSlots: [],
    });

    res.status(200).json(userDoc);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(422).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    const userDoc = await userModel.findOne({ email });
    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(
        password,
        `${userDoc.password}`
      );

      if (passwordCorrect) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              throw err;
            }
            res
              .cookie("token", token, {
                sameSite: "none",
                secure: true,
              })
              .json(userDoc);
          }
        );
      } else {
        res.status(422).json("Wrong passowrd");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(422).json({ error: "Error logging in user" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    path: "/",
  });
  res.json({ success: true });
});

export { router };
