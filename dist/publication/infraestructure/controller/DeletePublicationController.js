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
exports.DeletePublicationController = void 0;
class DeletePublicationController {
    constructor(deletePublicationUseCase) {
        this.deletePublicationUseCase = deletePublicationUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publicationId = req.params.id; // Asumo que pasas el ID de la publicación como parámetro en la URL
                yield this.deletePublicationUseCase.run(publicationId);
                res.status(200).send({
                    status: "success",
                    message: "Publicación eliminada exitosamente."
                });
            }
            catch (error) {
                console.error("Error en DeletePublicationController:", error);
                res.status(500).send({
                    status: "error",
                    message: "Error interno del servidor."
                });
            }
        });
    }
}
exports.DeletePublicationController = DeletePublicationController;
