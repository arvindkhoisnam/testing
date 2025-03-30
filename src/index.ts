import { PrismaClient } from "@prisma/client";
import express from "express";
import { z } from "zod";
import { prisma } from "./db";

export const app = express();

app.use(express.json());

const valdiateInput = z.object({
  todo: z.string(),
});

app.get("/", (req, res) => {
  res.status(200).send("Healthy Server");
});

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.status(200).json({ data: todos });
});

app.post("/todo", async (req, res) => {
  const validInput = valdiateInput.safeParse(req.body);
  if (!validInput.success) {
    res.status(400).json({ data: "Invalid input, please try again." });
    return;
  }
  const newTodo = await prisma.todo.create({
    data: {
      todo: validInput.data.todo,
    },
  });
  // res.status(200).json({ data: `Todo created with id ${newTodo.id}` });
  res.status(200).json({ data: `Todo created.` });
});
