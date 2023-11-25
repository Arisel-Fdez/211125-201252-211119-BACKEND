"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPublicationRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
//import { authMiddleware } from "../../auth/middlewares/authMiddleware"; 
exports.userPublicationRouter = express_1.default.Router();
// Middleware de autenticación
//userPublicationRouter.use(authMiddleware);
// Ruta para agregar una nueva publicación
exports.userPublicationRouter.post("/publish", dependencies_1.userPublicationController.run.bind(dependencies_1.userPublicationController));
// Ruta para ver todas las publicaciones
exports.userPublicationRouter.get("/", dependencies_1.viewPublicationsController.run.bind(dependencies_1.viewPublicationsController));
// Ruta para eliminar una publicación específica por su ID
exports.userPublicationRouter.delete("/publication/:id", dependencies_1.deletePublicationController.run.bind(dependencies_1.deletePublicationController));
exports.userPublicationRouter.get("/:userId/publications", dependencies_1.getUserPublicationsController.run.bind(dependencies_1.getUserPublicationsController));
// Ruta para obtener imágenes de Firebase
exports.userPublicationRouter.get('/images', dependencies_1.viewImagesController.run.bind(dependencies_1.viewImagesController));
//Ruta para Obtener Audios Firebase
exports.userPublicationRouter.get('/audios', dependencies_1.viewAudioController.run.bind(dependencies_1.viewAudioController));
//Ruta para Obtener gif Firebase
exports.userPublicationRouter.get('/gif', dependencies_1.viewGifsController.run.bind(dependencies_1.viewGifsController));
//Ruta para Obtener video Firebase
exports.userPublicationRouter.get('/videos', dependencies_1.viewVideosController.run.bind(dependencies_1.viewVideosController));
//Ruta para Obtener pdf Firebase
exports.userPublicationRouter.get('/pdf', dependencies_1.viewPDFsController.run.bind(dependencies_1.viewPDFsController));
