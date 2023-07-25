import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { LexoRank } from "lexorank";

const prisma = new PrismaClient();

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const body = req.body as {
      title: string;
      section: string;
    };

    const maxTaskRankAggregation = await prisma.task.aggregate({
      _max: {
        rank: true
      },
      where: {
        userId: req.user.id,
        section: body.section
      }
    });
    const maxTaskRank = maxTaskRankAggregation._max.rank;

    let taskRank = LexoRank.min().genNext();
    if (maxTaskRank) {
      taskRank = LexoRank.parse(maxTaskRank).genNext();
    }

    await prisma.task.create({
      data: {
        title: body.title,
        section: body.section,
        rank: taskRank.toString(),
        userId: req.user.id
      }
    });

    return res.status(200).json({
      message: "Create task success"
    });
  } catch (error) {
    next(error);
  }
};
