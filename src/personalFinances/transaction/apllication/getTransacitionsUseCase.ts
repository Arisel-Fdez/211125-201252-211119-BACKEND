import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';

export class GetTransactionsUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        accountId: number,
    ): Promise<Transaction[] | Error | string> {
        try {
            if (!accountId) {
                return new Error('No se pudo crear la cuenta');
            }

            const transaccion = await this.transactionRepository.getTransactions(accountId);
            if (transaccion !== "success") {
                return new Error('No se pudo encontrar las transacciones');
            }

            return transaccion;
        } catch (Error: any) {
            return new Error('Error al listar las transacciones: ' + Error.message);
        }
    }
}