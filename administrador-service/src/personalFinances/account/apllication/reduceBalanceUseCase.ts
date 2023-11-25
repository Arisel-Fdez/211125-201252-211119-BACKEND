import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { enviarMensaje } from "./events/productor";

export class ReduceBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number, balance: number): Promise<Account | Error |String> {
        try {
            if (!userId || !balance) {
                return new Error('Se deben rellenar todos los campos');
            }
            const data = {
                balance : balance,
                type : false
            };
            await enviarMensaje(data);
            
            const createdAccount = await this.accountRepository.reduceBalance(userId, balance);
            if (createdAccount instanceof Error) {
                return new Error('No se pudo recuperar el balance la cuenta');
            }
            return createdAccount;
        } catch (error: any) {
            return new Error('Error al recuperar balance: ' + error.message);
        }
    }
}