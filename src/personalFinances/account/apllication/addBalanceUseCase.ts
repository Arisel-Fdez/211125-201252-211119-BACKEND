import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class AddBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number, balance: number): Promise<Account | Error |String> {
        try {
            if (userId || !balance) {
                return new Error('Se deben rellenar todos los campos');
            }

            const createdAccount = await this.accountRepository.addBalance(userId, balance);
            if (createdAccount !== "success") {
                return new Error('No se pudo agregar balance la cuenta');
            }
            return createdAccount;
        } catch (error: any) {
            return new Error('Error al agregar balance: ' + error.message);
        }
    }
}