import express from "express";
import { z } from "zod";
import { prisma } from "./db";

export const app = express();

app.use(express.json());

const valdiateInput = z.object({
  todo: z.string(),
});

const validateUpdate = z.object({
  id: z.string(),
  newTodo: z.string(),
});

app.get("/", (req, res) => {
  res.status(200).json({ data: "Healthy Server" });
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
  res.status(200).json({ data: `Todo created with id ${newTodo.id}` });
});

app.put("/update", async (req, res) => {
  const validInputs = validateUpdate.safeParse(req.body);
  if (!validInputs.success) {
    res.status(400).json({ data: "Invalid inputs, please try again." });
    return;
  }
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: validInputs.data.id },
      data: { todo: validInputs.data.newTodo },
    });
    res
      .status(200)
      .json({ message: `Todo has been updated`, data: updatedTodo });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(400)
        .json({ message: "There was an error.", data: err.message });
    }
    console.log(err);
  }
});
