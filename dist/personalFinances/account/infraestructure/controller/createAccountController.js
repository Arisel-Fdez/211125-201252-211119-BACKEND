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
exports.CreateAccountController = void 0;
class CreateAccountController {
    constructor(createAccountUseCase) {
        this.createAccountUseCase = createAccountUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.body;
                const result = yield this.createAccountUseCase.run(id);
                if (result instanceof Error) {
                    return res.status(200).send({
                        status: "success",
                        data: result,
                        message: "Balance actualizado con éxito",
                    });
                }
                return res.status(404).send({
                    status: "error",
                    message: "Error al encontrar la cuenta asociada",
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
exports.CreateAccountController = CreateAccountController;
