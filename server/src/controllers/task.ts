import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { LexoRank } from "lexorank";
import { generateLexorank } from "../utils/lexorank";

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

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const tasksData = await prisma.task.findMany({
      where: {
        userId: req.user.id
      }
    });

    const tasks = {
      Plan: tasksData.filter((task) => task.section === "Plan"),
      Process: tasksData.filter((task) => task.section === "Process"),
      Done: tasksData.filter((task) => task.section === "Done")
    };

    return res.status(200).json({
      message: "Create task success",
      tasks
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const task = await prisma.task.findUnique({
      where: { id: req.params.taskId }
    });

    if (!task) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Task not found"
      });
    }

    if (task.userId !== req.user.id) {
      return res.status(401).json({
        type: "UNAUTHORIZED",
        message: "Unauthorized Access"
      });
    }

    // let rank = undefined;

    // if (req.body.order) {
    //   const tasks = await prisma.task.findMany({
    //     where: { userId: req.user.id, section: task.section },
    //     orderBy: { rank: "asc" }
    //   });
    //   if (tasks.length > 1 && req.body.order <= tasks.length) {
    //     rank = generateLexorank(tasks, task.rank, req.body.order);
    //   }
    // }

    await prisma.task.update({
      data: {
        title: req.body.title,
        rank: req.body.rank,
        section: req.body.section
      },
      where: { id: task.id }
    });

    return res.status(200).json({
      message: "Update task success"
    });
  } catch (error) {
    next(error);
  }
};
