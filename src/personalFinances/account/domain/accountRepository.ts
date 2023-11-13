import { Account } from "./account";

export interface AccountRepository {
    createAccount(id: number,
        userId: number,
        balance: number): Promise<Account | Error>; //post

    getAccountBalance(id: number, userId: number): Promise <Account|Error >; //get

    addBalance(userId: number, balance: number): Promise <String | Error>; //put

    reduceBalance(userId: number, balance: number): Promise <String | Error>; //put

}
