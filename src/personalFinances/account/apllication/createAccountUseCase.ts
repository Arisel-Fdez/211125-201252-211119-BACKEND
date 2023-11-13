import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class CreateAccountUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(id: number, userId: number, balance: number): Promise<Account | Error> {
        try {
            if (!id || !userId || !balance) {
                return new Error('No se pudo crear la cuenta');
            }

            const createdAccount = await this.accountRepository.createAccount(id, userId, balance);
            if (createdAccount === null) {
                return new Error('No se pudo crear la cuenta');
            }
            return createdAccount;
        } catch (Error: any) {
            return new Error('Error al crear la cuenta: ' + Error.message);
        }
    }
}