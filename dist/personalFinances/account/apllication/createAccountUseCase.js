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
exports.CreateAccountUseCase = void 0;
class CreateAccountUseCase {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    run(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    return new Error('No se pudo crear la cuenta');
                }
                const createdAccount = yield this.accountRepository.createAccount(userId);
                if (createdAccount === null) {
                    return new Error('No se pudo crear la cuenta');
                }
                return createdAccount;
            }
            catch (Error) {
                return new Error('Error al crear la cuenta: ' + Error.message);
            }
        });
    }
}
exports.CreateAccountUseCase = CreateAccountUseCase;