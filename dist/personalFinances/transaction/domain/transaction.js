"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(id, date, type, amount, description, categoriId, accountId) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.categoriId = categoriId;
        this.accountId = accountId;
    }
}
exports.Transaction = Transaction;
