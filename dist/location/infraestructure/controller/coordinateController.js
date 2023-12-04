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
exports.CoordinateController = void 0;
class CoordinateController {
    constructor(addCoordinateUseCase) {
        this.addCoordinateUseCase = addCoordinateUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, latitude, longitude } = req.body;
            try {
                const coordinate = yield this.addCoordinateUseCase.run(userId, latitude, longitude);
                return res.status(201).json(coordinate);
            }
            catch (error) {
                console.error("Error en CoordinateController:", error);
                return res.status(500).json({ message: "Error interno del servidor." });
            }
        });
    }
}
exports.CoordinateController = CoordinateController;
