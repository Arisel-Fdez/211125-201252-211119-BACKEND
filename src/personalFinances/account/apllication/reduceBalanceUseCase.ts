import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class ReduceBalance {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(id: number, userId: string, balance: string): Promise<String | Error| Account> {
        try {
            if (userId || !balance) {
                return new Error('Se deben rellenar todos los campos');
            }

            const createdAccount = await this.accountRepository.reduceBalance(parseInt(userId), parseInt(balance));
            if (createdAccount === null) {
                return new Error('No se pudo recuperar el balance la cuenta');
            }
            return createdAccount;
        } catch (error: any) {
            return new Error('Error al recuperar balance: ' + error.message);
        }
    }
}