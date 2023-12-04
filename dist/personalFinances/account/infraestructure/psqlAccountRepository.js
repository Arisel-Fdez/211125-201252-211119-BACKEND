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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgsqlAccountRepository = void 0;
const account_1 = require("../domain/account");
const accountModel_1 = __importDefault(require("./models/accountModel"));
class PgsqlAccountRepository {
    deleteAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteAccount = yield accountModel_1.default.destroy({ where: { userId } });
                if (!deleteAccount) {
                    return new Error('No se encontraron transacciones para la cuenta');
                }
                return "success";
            }
            catch (error) {
                return new Error('Error en la transacción:' + error);
            }
        });
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield accountModel_1.default.findAll();
                if (accounts.length === 0) {
                    return new Error('No se encontraron transacciones para la cuenta');
                }
                return accounts.map(account => new account_1.Account(account.id, account.userId, account.balance));
            }
            catch (error) {
                return new Error('Error en la transacción:' + error);
            }
        });
    }
    createAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAccount = yield accountModel_1.default.create({ userId });
                return new account_1.Account(createdAccount.id, createdAccount.balance, createdAccount.userId);
            }
            catch (error) {
                return new Error('Error en la transacción:' + error);
            }
        });
    }
    getAccountBalance(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountModel_1.default.findOne({ where: { id, userId } });
                if (!account) {
                    return new Error('Cuenta no encontrada');
                }
                const result = new account_1.Account(account.id, account.userId, account.balance);
                return result;
            }
            catch (error) {
                return new Error('Error en la transacción:' + error.message);
            }
        });
    }
    addBalance(userId, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountModel_1.default.findOne({ where: { userId } });
                if (account instanceof Error || !account) {
                    return new Error('Cuenta no encontrada');
                }
                const oldBalance = account.balance;
                const newBalance = oldBalance + balance;
                account.balance = newBalance;
                yield account.save();
                return new account_1.Account(account.id, account.userId, account.balance);
            }
            catch (error) {
                console.error('Error en la transacción:', error);
                return null;
            }
        });
    }
    reduceBalance(userId, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountModel_1.default.findOne({ where: { userId } });
                if (account instanceof Error || !account) {
                    return new Error('Cuenta no encontrada');
                }
                if (account.balance < balance) {
                    throw new Error('Saldo insuficiente');
                }
                const oldBalance = account.balance;
                const newBalance = oldBalance - balance;
                account.balance = newBalance;
                yield account.save();
                return new account_1.Account(account.id, account.userId, account.balance);
            }
            catch (error) {
                console.error('Error en la transacción:');
                return null;
            }
        });
    }
}
exports.PgsqlAccountRepository = PgsqlAccountRepository;
