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
exports.CreateTransactionController = void 0;
class CreateTransactionController {
    constructor(CreateTransactionUseCase) {
        this.CreateTransactionUseCase = CreateTransactionUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { date, type, amount, description, categoriId, accountId } = req.body;
                const result = yield this.CreateTransactionUseCase.run(date, type, amount, description, categoriId, accountId);
                console.log('first', date, type, amount, description, categoriId, accountId);
                console.log('result', result);
                if (result instanceof Error) {
                    return res.status(404).send({
                        status: "error",
                        message: "Error al Crear transaccion",
                    });
                }
                return res.status(200).send({
                    status: "success",
                    data: result,
                    message: "Transaccion creada con éxito",
                });
            }
            catch (error) {
                return res.status(500).send({
                    status: "error",
                    message: "Error al realizar la transacción",
                });
            }
        });
    }
}
exports.CreateTransactionController = CreateTransactionController;
