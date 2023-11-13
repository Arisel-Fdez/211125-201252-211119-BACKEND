import { Transaction } from "./transaction";

export interface TransactionRepository {
    createTransaction(
        id: number, 
        date: Date, 
        type: string,
        amount: string, 
        description: string, 
        categoriId: string, 
        accountId: number
        ): Promise<Transaction | Error | string>;

    getTransaction(id: number, accountId:number): Promise<Transaction | Error | string>;
    
    delTransaction(id: string): Promise<string|Error>;

    getTransactions(accountId: number): Promise<Transaction[]|Error|string>
}
