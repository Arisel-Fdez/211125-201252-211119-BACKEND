"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.transactionRouter = express_1.default.Router();
exports.transactionRouter.get("/get/:id/:accountId", dependencies_1.getTransactionController.run.bind(dependencies_1.getTransactionController));
exports.transactionRouter.post("/create", dependencies_1.createTransactionController.run.bind(dependencies_1.createTransactionController));
exports.transactionRouter.get("/list/all/:accountId", dependencies_1.getAllTransacitionsController.run.bind(dependencies_1.getAllTransacitionsController));
