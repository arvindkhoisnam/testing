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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("./db");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const valdiateInput = zod_1.z.object({
    todo: zod_1.z.string(),
});
exports.app.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield db_1.prisma.todo.findMany();
    res.status(200).json({ data: todos });
}));
exports.app.post("/todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validInput = valdiateInput.safeParse(req.body);
    if (!validInput.success) {
        res.status(400).json({ data: "Invalid input, please try again." });
        return;
    }
    yield db_1.prisma.todo.create({
        data: {
            todo: validInput.data.todo,
        },
    });
    res.status(200).json({ data: "Todo created" });
}));
