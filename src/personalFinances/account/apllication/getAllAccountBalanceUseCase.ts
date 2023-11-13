import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";

export class GetAllAccountBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(id: number, userId: string): Promise<Error| Account[]> {
        try {
            if (!id || !userId ) {
                return new Error('Se deben rellenar todos los campos');
            }

            const createdAccount = await this.accountRepository.getAllCountBalance(id, parseInt(userId));
            return createdAccount;
        } catch (error: any) {
            return new Error('Error al recuperar balance: ' + error.message);
        }
    }
}