"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.accountRouter = express_1.default.Router();
exports.accountRouter.put("/balance/add/:userId", dependencies_1.addBalanceController.run.bind(dependencies_1.addBalanceController));
exports.accountRouter.get("/get/balance/:id/:userId", dependencies_1.getAccountBalanceController.run.bind(dependencies_1.getAccountBalanceController));
exports.accountRouter.put("/balance/reduce/:userId", dependencies_1.reduceBalanceController.run.bind(dependencies_1.reduceBalanceController));
exports.accountRouter.get("/list/all", dependencies_1.getAllAccountsController.run.bind(dependencies_1.getAllAccountsController));
exports.accountRouter.delete("/delete/:userId", dependencies_1.deleteAccountController.run.bind(dependencies_1.deleteAccountController));
