import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import { enviarMensaje } from "./events/productor";

export class AddBalanceUseCase {
    constructor(readonly accountRepository: AccountRepository) { }
    async run(userId: number, balance: number): Promise<Account | Error |String> {
        try {
            if (!userId || !balance) {
                return new Error('Se deben rellenar todos los campos');
            }
            const data = {
                balance : balance,
                type : true
            };
            await enviarMensaje(data);

            const addBalance = await this.accountRepository.addBalance(userId, balance);
            if (addBalance !== "success") {
                return new Error('No se pudo agregar balance la cuenta');
            }
            return addBalance;
        } catch (error: any) {
            return new Error('Error al agregar balance: ' + error.message);
        }
    }
}