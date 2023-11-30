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
exports.GetCoordinatesByUserIdController = void 0;
class GetCoordinatesByUserIdController {
    constructor(getCoordinatesByUserIdUseCase) {
        this.getCoordinatesByUserIdUseCase = getCoordinatesByUserIdUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const coordinates = yield this.getCoordinatesByUserIdUseCase.run(Number(userId));
                return res.status(200).json(coordinates);
            }
            catch (error) {
                console.error("Error en GetCoordinatesByUserIdController:", error);
                return res.status(500).json({ message: "Error interno del servidor." });
            }
        });
    }
}
exports.GetCoordinatesByUserIdController = GetCoordinatesByUserIdController;
