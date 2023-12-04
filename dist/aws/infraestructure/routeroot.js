"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routeroot = void 0;
const express_1 = __importDefault(require("express"));
const getUserController_1 = require("./controller/getUserController");
exports.Routeroot = express_1.default.Router();
// Definir las rutas que manejará este enrutador
exports.Routeroot.get('/', getUserController_1.getUserController); // Ruta raíz que devuelve 200 OK
