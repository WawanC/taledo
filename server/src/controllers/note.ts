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

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    console.log(req.user.id);
    console.log(req.params.noteId);

    const note = await prisma.note.findFirst({
      where: { id: req.params.noteId.trim(), userId: req.user.id }
    });

    if (!note) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Note not found"
      });
    }

    return res.status(200).json({
      message: "Fetch note success",
      note: note
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

export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const note = await prisma.note.findFirst({
      where: {
        id: req.params.noteId,
        userId: req.user.id
      }
    });

    if (!note) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Note not found"
      });
    }

    await prisma.note.delete({
      where: {
        id: note.id
      }
    });

    return res.status(200).json({
      message: "Delete note success"
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const note = await prisma.note.findFirst({
      where: {
        id: req.params.noteId,
        userId: req.user.id
      }
    });

    if (!note) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Note not found"
      });
    }

    await prisma.note.update({
      where: { id: note.id },
      data: { content: req.body.content.trim() }
    });

    return res.status(200).json({
      message: "Update note success"
    });
  } catch (error) {
    next(error);
  }
};
