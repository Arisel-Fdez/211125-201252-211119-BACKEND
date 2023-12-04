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
exports.DeleteCommentController = void 0;
class DeleteCommentController {
    constructor(deleteCommentUseCase) {
        this.deleteCommentUseCase = deleteCommentUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId } = req.params;
            try {
                yield this.deleteCommentUseCase.run(Number(commentId));
                return res.status(200).json({ message: "Comentario eliminado con éxito." });
            }
            catch (error) {
                console.error("Error en DeleteCommentController:", error);
                return res.status(404).json({ message: "Comentario no encontrado." });
            }
        });
    }
}
exports.DeleteCommentController = DeleteCommentController;
