"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/create", dependencies_1.addUsersController.run.bind(dependencies_1.addUsersController));
exports.userRouter.get("/", dependencies_1.listAllUsersController.run.bind(dependencies_1.listAllUsersController));
exports.userRouter.delete("/delete/:id", dependencies_1.deleteUserController.run.bind(dependencies_1.deleteUserController));
