import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { connect } from "http2";

const prisma = new PrismaClient();

export const createNote: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    await prisma.note.create({
      data: {
        content: req.body.content.trim(),
        user: { connect: { id: req.user.id } }
      }
    });

    return res.status(200).json({
      message: "Create note success"
    });
  } catch (error) {
    next(error);
  }
};
