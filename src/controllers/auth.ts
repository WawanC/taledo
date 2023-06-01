import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username: req.body.username.trim() }
    });

    if (user) {
      return res.status(409).json({
        type: "CONFLICT",
        message: "Username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await prisma.user.create({
      data: { username: req.body.username.trim(), password: hashedPassword }
    });

    return res.status(200).json({
      message: "User register success"
    });
  } catch (error) {
    next(error);
  }
};

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Get me success",
      user: req.user || null
    });
  } catch (error) {
    next(error);
  }
};
