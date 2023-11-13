import { Transaction } from "./transaction";

export interface TransactionRepository {
    createTransaction(
        date: Date, 
        type: string,
        amount: number, 
        description: string, 
        categoriId: number, 
        accountId: number
        ): Promise<Transaction | Error | string>;

    getTransaction(id: number, accountId:number): Promise<Transaction | Error | string>;
    
    delTransaction(id: string): Promise<string|Error>;

    getTransactions(accountId: number): Promise<Transaction[]|Error|string>
}
