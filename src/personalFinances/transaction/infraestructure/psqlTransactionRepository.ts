import { Transaction } from "../domain/transaction";
import { TransactionRepository } from "../domain/transactionRepository";


export class PgsqlTransactionRepository implements TransactionRepository {
    createTransaction(id: number, date: Date, type: string, amount: string, description: string, categoriId: string, accountId: number): Promise<string | Transaction | Error> {
        throw new Error("Method not implemented.");
    }
    getTransaction(id: number, accountId: number): Promise<string | Transaction | Error> {
        throw new Error("Method not implemented.");
    }
    delTransaction(id: string): Promise<string | Error> {
        throw new Error("Method not implemented.");
    }
    getTransactions(accountId: number): Promise<string | Transaction[] | Error> {
        throw new Error("Method not implemented.");
    }
    

}
