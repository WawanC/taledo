import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { LexoRank } from "lexorank";
import { generateLexorank } from "../utils/lexorank";

const prisma = new PrismaClient();

export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const todos = await prisma.todo.findMany({
      where: { userId: req.user.id },
      orderBy: { rank: "asc" }
    });

    return res.status(200).json({
      message: "Fetch todos success",
      todos: todos
    });
  } catch (error) {
    next(error);
  }
};

export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const maxTodoRankAggregation = await prisma.todo.aggregate({
      _max: {
        rank: true
      },
      where: {
        userId: req.user.id
      }
    });
    const maxTodoRank = maxTodoRankAggregation._max.rank;
    let todoRank = LexoRank.min().genNext();

    if (maxTodoRank) {
      todoRank = LexoRank.parse(maxTodoRank).genNext();
    }

    await prisma.todo.create({
      data: {
        title: req.body.title.trim(),
        isCompleted: false,
        createdAt: new Date().toISOString(),
        user: { connect: { id: req.user.id } },
        rank: todoRank.toString()
      }
    });

    return res.status(200).json({
      message: "Create todo success"
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const todo = await prisma.todo.findUnique({
      where: { id: req.params.todoId }
    });

    if (!todo) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Todo not found"
      });
    }

    if (todo.userId !== req.user.id) {
      return res.status(401).json({
        type: "UNAUTHORIZED",
        message: "Unauthorized Access"
      });
    }

    let rank = undefined;

    if (req.body.order) {
      const todos = await prisma.todo.findMany({
        where: { userId: req.user.id },
        orderBy: { rank: "asc" }
      });
      if (todos.length > 1) {
        rank = generateLexorank(todos, todo.rank, req.body.order);
      }
    }

    await prisma.todo.update({
      data: {
        title: req.body.title,
        isCompleted: req.body.isCompleted,
        rank: rank?.toString() || undefined
      },
      where: { id: todo.id }
    });

    return res.status(200).json({
      message: "Update todo success"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("UNAUTHORIZED");

    const todo = await prisma.todo.findUnique({
      where: { id: req.params.todoId }
    });

    if (!todo) {
      return res.status(404).json({
        type: "NOT_FOUND",
        message: "Todo not found"
      });
    }

    if (todo.userId !== req.user.id) {
      return res.status(401).json({
        type: "UNAUTHORIZED",
        message: "Unauthorized Access"
      });
    }

    await prisma.todo.delete({ where: { id: todo.id } });

    return res.status(200).json({
      message: "Delete todo success"
    });
  } catch (error) {
    next(error);
  }
};
