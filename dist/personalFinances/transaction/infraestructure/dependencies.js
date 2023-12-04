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
exports.createTransactionServices = exports.getAllTransacitionsController = exports.getTransactionController = exports.createTransactionController = void 0;
const psqlTransactionRepository_1 = require("./psqlTransactionRepository");
const createTransactionConsume_1 = require("./services/createTransactionConsume");
const createTransactionUseCase_1 = require("../apllication/createTransactionUseCase");
const createTransactionController_1 = require("./controller/createTransactionController");
const getTransactionUseCase_1 = require("../apllication/getTransactionUseCase");
const getTransactionController_1 = require("./controller/getTransactionController");
const getAllTransacitionsUseCase_1 = require("../apllication/getAllTransacitionsUseCase");
const getAllTransactionsController_1 = require("./controller/getAllTransactionsController");
const pgsqlUsersRepository = new psqlTransactionRepository_1.PgsqlTransactionRepository();
const createTransactionUseCase = new createTransactionUseCase_1.CreateTransactionUseCase(pgsqlUsersRepository);
exports.createTransactionController = new createTransactionController_1.CreateTransactionController(createTransactionUseCase);
const getTransactionUseCase = new getTransactionUseCase_1.GetTransactionUseCase(pgsqlUsersRepository);
exports.getTransactionController = new getTransactionController_1.GetTransactionController(getTransactionUseCase);
const getAllTransacitionsUseCase = new getAllTransacitionsUseCase_1.GetAllTransacitionsUseCase(pgsqlUsersRepository);
exports.getAllTransacitionsController = new getAllTransactionsController_1.GetAllTransacitionsController(getAllTransacitionsUseCase);
function createTransactionServices() {
    return __awaiter(this, void 0, void 0, function* () {
        const createTransactionUseCase = new createTransactionUseCase_1.CreateTransactionUseCase(pgsqlUsersRepository);
        yield (0, createTransactionConsume_1.startOrderConsumer)(createTransactionUseCase);
    });
}
exports.createTransactionServices = createTransactionServices;
