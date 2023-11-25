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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
class CommentController {
    constructor(addCommentUseCase) {
        this.addCommentUseCase = addCommentUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId, userId } = req.params;
            const { content } = req.body;
            try {
                const comment = yield this.addCommentUseCase.run(Number(publicationId), Number(userId), content);
                if (comment) {
                    return res.status(201).json(comment);
                }
                else {
                    return res.status(400).json({ message: "No se pudo crear el comentario." });
                }
            }
            catch (error) {
                console.error("Error en CommentController:", error);
                return res.status(500).json({ message: "Error interno del servidor." });
            }
        });
    }
}
exports.CommentController = CommentController;
