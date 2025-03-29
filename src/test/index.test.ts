import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { app } from "..";
import { prisma } from "../__mocks__/db";

// vi.mock("../db", () => ({
//   prisma: {
//     todo: {
//       create: vi.fn(),
//     },
//   },
// }));

vi.mock("../db");

describe("POST/todo", () => {
  it("should be able to create a todo", async () => {
    prisma.todo.create.mockResolvedValue({
      id: "random_id_",
      todo: "",
      createdAt: new Date(),
    });

    const res = await request(app).post("/todo").send({
      todo: "Kill it",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBe(`Todo created with id random_id_`);
  });

  it("should not be able to create with wrong inputs.", async () => {
    const res = await request(app).post("/todo").send({ todo: 423423 });
    expect(res.statusCode).toBe(400);
    expect(res.body.data).toBe("Invalid input, please try again.");
  });
});
