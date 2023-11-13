import { PgsqlTransactionRepository } from "./psqlTransactionRepository";

import { AddBalanceUseCase } from "../apllication/addBalanceUseCase";
import { AddBalanceController } from "./controller/addBalanceController";

import { CreateAccountUseCase } from "../apllication/createAccountUseCase";
import { CreateAccountController } from "./controller/createAccountController";

import { GetAccountBalanceUseCase } from "../apllication/getAccountBalanceUseCase";
import { GetAccountBalanceController } from "./controller/getAccountBalanceController";

import { ReduceBalanceUseCase } from "../apllication/reduceBalanceUseCase";
import { ReduceBalanceController } from "./controller/reduceBalanceController";

const pgsqlUsersRepository = new PgsqlTransactionRepository();

const addBalanceUseCase = new AddBalanceUseCase(pgsqlUsersRepository);
export const addBalanceController = new AddBalanceController(addBalanceUseCase);

const createAccountUseCase = new CreateAccountUseCase(pgsqlUsersRepository);
export const createAccountController = new CreateAccountController(createAccountUseCase);

const getAccountBalanceUseCase = new GetAccountBalanceUseCase(pgsqlUsersRepository);
export const getAccountBalanceController = new GetAccountBalanceController(getAccountBalanceUseCase);

const reduceBalanceUseCase = new ReduceBalanceUseCase(pgsqlUsersRepository);
export const reduceBalanceController = new ReduceBalanceController(reduceBalanceUseCase);