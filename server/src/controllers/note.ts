import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const createNote: RequestHandler = async (req, res, next) => {
  try {
    await prisma.note.create({
      data: {
        content: req.body.content.trim()
      }
    });

    return res.status(200).json({
      message: "Create note success"
    });
  } catch (error) {
    next(error);
  }
};
