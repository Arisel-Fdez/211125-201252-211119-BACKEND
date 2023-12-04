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
exports.ReduceBalanceUseCase = void 0;
class ReduceBalanceUseCase {
    constructor(accountRepository, rabbit) {
        this.accountRepository = accountRepository;
        this.rabbit = rabbit;
    }
    run(userId, balance, description, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId || !balance || balance < 1 || !description || !categoryId) {
                    return new Error('Se deben rellenar todos los campos');
                }
                yield this.rabbit.connect();
                const reduceBalance = yield this.accountRepository.reduceBalance(userId, balance, "", 0);
                if (reduceBalance instanceof Error || reduceBalance === null) {
                    return new Error('No se pudo agregar balance la cuenta');
                }
                const data = {
                    id: reduceBalance.id,
                    balance: balance,
                    type: false,
                    description: description,
                    categoryId: categoryId
                };
                yield this.rabbit.publishMessage('orders-exchange', 'order.paid', { data });
                return reduceBalance;
            }
            catch (error) {
                return new Error('Error al recuperar balance: ' + error.message);
            }
        });
    }
}
exports.ReduceBalanceUseCase = ReduceBalanceUseCase;
