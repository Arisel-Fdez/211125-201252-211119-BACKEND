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
exports.CreateTransactionUseCase = void 0;
class CreateTransactionUseCase {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    run(date, type, amount, description, categoriId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('first', date, type, amount, description, categoriId, accountId);
                if (!date || type === null || !amount || !description || !categoriId || !accountId) {
                    console.log('alv todo');
                    return new Error('Falta indormacion');
                }
                const createTransaction = yield this.transactionRepository.createTransaction(date, type, amount, description, categoriId, accountId);
                console.log('createTransaction', createTransaction);
                if (createTransaction instanceof Error) {
                    return new Error('No se pudo encontrar la transaccion');
                }
                return createTransaction;
            }
            catch (error) {
                return new Error('Error al encontrar la transaccion: ' + error.message);
            }
        });
    }
}
exports.CreateTransactionUseCase = CreateTransactionUseCase;
