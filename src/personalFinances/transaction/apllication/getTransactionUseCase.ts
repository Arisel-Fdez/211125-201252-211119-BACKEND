import { Transaction } from '../domain/transaction';
import { TransactionRepository } from '../domain/transactionRepository';

export class GetTransactionUseCase {

    constructor(private readonly transactionRepository: TransactionRepository) { }

    async run(
        id: number,
        accountId: number 
    ): Promise<Transaction | Error | string> {
        try {
            if (!id || !accountId) {
                return new Error('No se pudo crear la cuenta');
            }

            const transaccion = await this.transactionRepository.getTransaction(id, accountId);
            if (transaccion !== "success") {
                return new Error('No se pudo crear la transaccion');
            }

            return transaccion;
        } catch (Error: any) {
            return new Error('Error al crear transaccion: ' + Error.message);
        }
    }
}
