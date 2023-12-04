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
exports.PgsqlCommentRepository = void 0;
const commentModel_1 = __importDefault(require("./models/commentModel"));
const userModel_1 = __importDefault(require("../../user/infraestructure/models/userModel"));
const comment_1 = require("../domain/comment");
class PgsqlCommentRepository {
    addComment(publicationId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(userId);
                if (!user)
                    throw new Error('Usuario no encontrado.');
                const comment = yield commentModel_1.default.create({
                    publicationId,
                    userId,
                    content
                });
                return new comment_1.Comment(comment.id, user.id, comment.publicationId, comment.content);
            }
            catch (error) {
                console.error("Error in PgsqlCommentRepository:", error);
                return null;
            }
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentModel_1.default.findByPk(commentId);
            if (!comment) {
                throw new Error('Comentario no encontrado.');
            }
            yield comment.destroy();
        });
    }
    getCommentsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield commentModel_1.default.findAll({
                where: { userId },
                include: [{ model: userModel_1.default, attributes: ['name'] }] // Asegúrate de que el nombre del campo coincida con tu modelo UserModel
            });
            return comments.map(comment => {
                var _a;
                return new comment_1.Comment(comment.id, comment.userId, comment.publicationId, comment.content, (_a = comment.user) === null || _a === void 0 ? void 0 : _a.name // Suponiendo que 'name' es el campo para el nombre en UserModel
                );
            });
        });
    }
    getCommentsByPublicationId(publicationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield commentModel_1.default.findAll({
                where: { publicationId },
                include: [{ model: userModel_1.default, attributes: ['name'] }]
            });
            return comments.map(comment => {
                var _a;
                return new comment_1.Comment(comment.id, comment.userId, comment.publicationId, comment.content, (_a = comment.user) === null || _a === void 0 ? void 0 : _a.name);
            });
        });
    }
}
exports.PgsqlCommentRepository = PgsqlCommentRepository;
