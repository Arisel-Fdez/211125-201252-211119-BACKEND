"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
const authMiddleware_1 = require("../../auth/middlewares/authMiddleware");
exports.commentRouter = express_1.default.Router();
// Middleware de autenticación
exports.commentRouter.use(authMiddleware_1.authMiddleware);
// Ruta para agregar un nuevo comentario a una publicación
exports.commentRouter.post("/publication/:publicationId/usercomment/:userId", dependencies_1.commentController.run.bind(dependencies_1.commentController));
exports.commentRouter.delete("/comment/:commentId", dependencies_1.deleteCommentController.run.bind(dependencies_1.deleteCommentController));
// Ruta para obtener los comentarios de un usuario por su ID
exports.commentRouter.get("/user/:userId/comments", dependencies_1.getCommentsByUserIdController.run.bind(dependencies_1.getCommentsByUserIdController));
exports.commentRouter.get("/publication/:publicationId", dependencies_1.getCommentsByPublicationIdController.run.bind(dependencies_1.getCommentsByPublicationIdController));
