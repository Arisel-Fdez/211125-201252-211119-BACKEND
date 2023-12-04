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
exports.PgsqlTransactionRepository = void 0;
const transaction_1 = require("../domain/transaction");
const transactionModel_1 = __importDefault(require("./models/transactionModel"));
class PgsqlTransactionRepository {
    createTransaction(date, type, amount, description, categoriId, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdTransaction = yield transactionModel_1.default.create({ date, type, amount, description, categoriId, accountId });
                return new transaction_1.Transaction(createdTransaction.id, createdTransaction.date, createdTransaction.type, createdTransaction.amount, createdTransaction.description, createdTransaction.categoriId, createdTransaction.accountId);
            }
            catch (error) {
                return new Error('Error en la transacción:' + error);
            }
        });
    }
    getTransaction(id, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield transactionModel_1.default.findOne({ where: { id, accountId } });
                console.log('transaction', transaction);
                if (!transaction) {
                    return new Error('Cuenta no encontrada');
                }
                return new transaction_1.Transaction(transaction.id, transaction.date, transaction.type, transaction.amount, transaction.description, transaction.categoriId, transaction.accountId);
            }
            catch (error) {
                return new Error('Error en la transacción:' + error.message);
            }
        });
    }
    delTransaction(id) {
        throw new Error("Method not implemented.");
    }
    getAllTransactions(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionModel_1.default.findAll({ where: { accountId } });
                if (transactions.length === 0) {
                    return new Error('No se encontraron transacciones para la cuenta');
                }
                return transactions.map(transaction => new transaction_1.Transaction(transaction.id, transaction.date, transaction.type, transaction.amount, transaction.description, transaction.categoriId, transaction.accountId));
            }
            catch (error) {
                return new Error('Error en la transacción:' + error);
            }
        });
    }
}
exports.PgsqlTransactionRepository = PgsqlTransactionRepository;
