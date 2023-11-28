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
exports.GetCommentsByPublicationIdController = void 0;
class GetCommentsByPublicationIdController {
    constructor(getCommentsByPublicationIdUseCase) {
        this.getCommentsByPublicationIdUseCase = getCommentsByPublicationIdUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { publicationId } = req.params;
            try {
                const comments = yield this.getCommentsByPublicationIdUseCase.run(Number(publicationId));
                return res.status(200).json(comments);
            }
            catch (error) {
                console.error("Error en GetCommentsByPublicationIdController:", error);
                return res.status(500).json({ message: "Error interno del servidor." });
            }
        });
    }
}
exports.GetCommentsByPublicationIdController = GetCommentsByPublicationIdController;
