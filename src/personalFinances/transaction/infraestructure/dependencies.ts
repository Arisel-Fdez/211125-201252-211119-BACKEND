import { PgsqlTransactionRepository } from "./psqlTransactionRepository";

import { CreateTransactionUseCase } from "../apllication/createTransactionUseCase";
import { CreateTransactionController } from "./controller/createTransactionController";

import { GetTransactionUseCase } from "../apllication/getTransactionUseCase";
import { GetTransactionController } from "./controller/getTransactionController";

import { GetTransactionsUseCase } from "../apllication/getTransacitionsUseCase";
import { GetTransactionsController } from "./controller/getTransactionsController";

const pgsqlUsersRepository = new PgsqlTransactionRepository();

const createTransactionUseCase = new CreateTransactionUseCase(pgsqlUsersRepository);
export const createTransactionController = new CreateTransactionController(createTransactionUseCase);

const getTransactionUseCase = new GetTransactionUseCase(pgsqlUsersRepository);
export const getTransactionController = new GetTransactionController(getTransactionUseCase);

const getTransactionsUseCase = new GetTransactionsUseCase(pgsqlUsersRepository);
export const getTransactionsController = new GetTransactionsController(getTransactionsUseCase);