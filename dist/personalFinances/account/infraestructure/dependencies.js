"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountController = exports.getAllAccountsController = exports.reduceBalanceController = exports.getAccountBalanceController = exports.addBalanceController = exports.createAccountServices = void 0;
const psqlAccountRepository_1 = require("./psqlAccountRepository");
const addBalanceUseCase_1 = require("../apllication/addBalanceUseCase");
const addBalanceController_1 = require("./controller/addBalanceController");
const createAccountUseCase_1 = require("../apllication/createAccountUseCase");
const getAccountBalanceUseCase_1 = require("../apllication/getAccountBalanceUseCase");
const getAccountBalanceController_1 = require("./controller/getAccountBalanceController");
const reduceBalanceUseCase_1 = require("../apllication/reduceBalanceUseCase");
const reduceBalanceController_1 = require("./controller/reduceBalanceController");
const getAllAccountsUseCase_1 = require("../apllication/getAllAccountsUseCase");
const getAllAccountsController_1 = require("./controller/getAllAccountsController");
const deleteAccountUseCase_1 = require("../apllication/deleteAccountUseCase");
const deleteAccountController_1 = require("./controller/deleteAccountController");
const rabbit_1 = require("./services/rabbit");
const createAccountConsume_1 = require("./services/createAccountConsume");
const rabbitMQ = new rabbit_1.RabbitMQ();
const pgsqlUsersRepository = new psqlAccountRepository_1.PgsqlAccountRepository();
function createAccountServices() {
    return __awaiter(this, void 0, void 0, function* () {
        const createAccountUseCase = new createAccountUseCase_1.CreateAccountUseCase(pgsqlUsersRepository);
        yield (0, createAccountConsume_1.startAccountConsumer)(createAccountUseCase);
    });
}
exports.createAccountServices = createAccountServices;
const addBalanceUseCase = new addBalanceUseCase_1.AddBalanceUseCase(pgsqlUsersRepository, rabbitMQ);
exports.addBalanceController = new addBalanceController_1.AddBalanceController(addBalanceUseCase);
const getAccountBalanceUseCase = new getAccountBalanceUseCase_1.GetAccountBalanceUseCase(pgsqlUsersRepository);
exports.getAccountBalanceController = new getAccountBalanceController_1.GetAccountBalanceController(getAccountBalanceUseCase);
const reduceBalanceUseCase = new reduceBalanceUseCase_1.ReduceBalanceUseCase(pgsqlUsersRepository, rabbitMQ);
exports.reduceBalanceController = new reduceBalanceController_1.ReduceBalanceController(reduceBalanceUseCase);
const getAllAccountsUseCase = new getAllAccountsUseCase_1.GetAllAccountsUseCase(pgsqlUsersRepository);
exports.getAllAccountsController = new getAllAccountsController_1.GetAllAccountsController(getAllAccountsUseCase);
const deleteAccountUseCase = new deleteAccountUseCase_1.DeleteAccountUseCase(pgsqlUsersRepository);
exports.deleteAccountController = new deleteAccountController_1.DeleteAccountController(deleteAccountUseCase);
