import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import AccountModel from "./models/accountModel";

export class PgsqlTransactionRepository implements AccountRepository {
    async deleteAccount(id: number, userId: number): Promise<String | Error> {
        try {
            const deleteAccount = await AccountModel.destroy({ where: { id, userId } })

            if (!deleteAccount) {
                return new Error('No se encontraron transacciones para la cuenta');
            }
            return "success"
        } catch (error) {
            return new Error('Error en la transacción:' + error);

        }
    }
    async getAllAccounts(): Promise<string | Error | Account[]> {
        try {
            const accounts = await AccountModel.findAll();

            if (accounts.length === 0) {
                return new Error('No se encontraron transacciones para la cuenta');
            }

            return accounts.map(account => new Account(
                account.id,
                account.userId,
                account.balance,
            ));
        } catch (error) {
            return new Error('Error en la transacción:' + error);

        }
    }
    createAccount(id: number, userId: number, balance: number): Promise<Account | Error> {
        throw new Error("Method not implemented.");
    }

    async getAccountBalance(id: number, userId: number): Promise<Account | Error> {
        try {
            const account = await AccountModel.findOne({ where: { id, userId } });
            if (!account) {
                return new Error('Cuenta no encontrada');
            }
            const result = new Account(account.id, account.userId, account.balance);
            return result;
        } catch (error: any) {
            return new Error('Error en la transacción:' + error.message);
        }
    }

    async addBalance(userId: number, balance: number): Promise<string | Error> {
        try {
            const account = await AccountModel.findOne({ where: { userId } });
            if (!account) {
                return new Error('Cuenta no encontrada');
            }
            const oldBalance = account.balance;
            const newBalance = oldBalance + balance;
            account.balance = newBalance;
            await account.save();
            return 'success';
        } catch (error) {
            console.error('Error en la transacción:', error);
            return 'fail';
        }
    }



    async reduceBalance(userId: number, balance: number): Promise<String | Error> {
        try {
            const account = await AccountModel.findOne({ where: { userId } });
            if (!account) {
                throw new Error('Cuenta no encontrada');
            }

            if (account.balance < balance) {
                throw new Error('Saldo insuficiente');
            }

            const oldBalance = account.balance;
            const newBalance = oldBalance - balance;
            account.balance = newBalance;
            await account.save();

            return "success";
        } catch (error) {
            console.error('Error en la transacción:');
            return "fail";
        }
    }

}
