"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const db_1 = require("../__mocks__/db");
// vi.mock("../db", () => ({
//   prisma: {
//     todo: {
//       create: vi.fn(),
//     },
//   },
// }));
vitest_1.vi.mock("../db");
(0, vitest_1.describe)("POST/todo", () => {
    (0, vitest_1.it)("should be able to create a todo", () => __awaiter(void 0, void 0, void 0, function* () {
        db_1.prisma.todo.create.mockResolvedValue({
            id: "random_id_",
            todo: "newTodo",
            createdAt: new Date(),
        });
        const res = yield (0, supertest_1.default)(__1.app).post("/todo").send({
            todo: "Kill it",
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        (0, vitest_1.expect)(res.body.data).toBe(`Todo created with id random_id_`);
    }));
    (0, vitest_1.it)("should not be able to create with wrong inputs.", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).post("/todo").send({ todo: 423423 });
        (0, vitest_1.expect)(res.statusCode).toBe(400);
        (0, vitest_1.expect)(res.body.data).toBe("Invalid input, please try again.");
    }));
});
