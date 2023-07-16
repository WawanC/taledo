import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const notes = await prisma.note.findMany({
      where: { userId: req.user.id }
    });

    return res.status(200).json({
      message: "Fetch notes success",
      notes: notes
    });
  } catch (error) {
    next(error);
  }
};

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
