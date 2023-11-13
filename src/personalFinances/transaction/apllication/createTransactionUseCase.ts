import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';

export class CreateTransactionUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        id: number,
        date: Date,
        type: string,
        amount: string,
        description: string,
        categoriId: string,
        accountId: number
    ): Promise<Transaction | Error | string> {
        try {

            if (!date || !amount || !description || !categoriId || !accountId) {
                return new Error('No se pudo crear la cuenta');
            }
            const createTransaction = await this.transactionRepository.createTransaction(id, date,type, amount, description, categoriId, accountId);
            if (createTransaction !== "success") {
                return new Error('No se pudo encontrar la transaccion');
            }

            return createTransaction;
        } catch (Error: any) {
            return new Error('Error al encontrar la transaccion: ' + Error.message);
        }
    }
}
