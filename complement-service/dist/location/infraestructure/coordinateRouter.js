"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinateRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependecies_1 = require("./dependecies");
exports.coordinateRouter = express_1.default.Router();
exports.coordinateRouter.post("/coordinate", dependecies_1.coordinateController.run.bind(dependecies_1.coordinateController));
exports.coordinateRouter.get("/user/:userId/coordinates", dependecies_1.getCoordinatesByUserIdController.run.bind(dependecies_1.getCoordinatesByUserIdController));
