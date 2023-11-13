import { Account } from "../domain/account";
import { AccountRepository } from "../domain/accountRepository";
import AccountModel from "./models/accountModel";


export class PgsqlTransactionRepository implements AccountRepository {
    createAccount(id: number, userId: number, balance: number): Promise<Account | Error> {
        throw new Error("Method not implemented.");
    }

    async getAccountBalance(id: number, userId: number): Promise<Account | Error> {
        try {
            const account = await AccountModel.findOne({ where: { userId }});
            if (!account) {
                throw new Error('Cuenta no encontrada');
            }
            const result = new Account(account.id, account.userId, account.balance);
            return result;
        } catch (error: any) {
            return new Error('Error en la transacción:'+ error.message);
        }
    }

    async addBalance(userId: number, balance: number): Promise<String | Error> {
        try {
            const account = await AccountModel.findOne({ where: { userId }});
            if (!account) {
                throw new Error('Cuenta no encontrada');
            }

            account.balance += balance;
            await account.save();
            return "success";
        } catch (error) {
            console.error('Error en la transacción:', error);
            return "fail";
        }
    }

    async reduceBalance(userId: number, balance: number): Promise<String | Error> {
        try {
            const account = await AccountModel.findOne({ where: { userId }});
            if (!account) {
                throw new Error('Cuenta no encontrada');
            }

            if (account.balance < balance) {
                throw new Error('Saldo insuficiente');
            }

            account.balance -= balance;
            await account.save();

            return "success";
        } catch (error) {
            console.error('Error en la transacción:', error);
            return "fail";
        }
    }

    async getAllCountBalance(id: number, userId: number): Promise<Account[] | Error> {
        try {
            const account = await AccountModel.findAll({ where: { id, userId } });
        
            if (!account || account.length === 0) {
                throw new Error('Cuenta no encontrada');
            }
             return account.map(account => new Account(account.id, account.userId, account.balance));

        } catch (error: any) {
            return new Error('Error en la transacción:'+ error.message);
        }
    }
}
