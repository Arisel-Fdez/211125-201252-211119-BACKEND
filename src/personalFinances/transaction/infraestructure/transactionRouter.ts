import express from "express";
import { 
    createTransactionController,
    getTransactionController,
    getTransactionsController
} from "./dependencies";

export const transactionRouter = express.Router();

transactionRouter.post(
    "/create/account",
    createTransactionController.run.bind(createTransactionController)
);

transactionRouter.get(
    "/get/:id/:accountId",
    getTransactionsController.run.bind(getTransactionsController)
);

transactionRouter.get(
    "/get/all/:accountId",
    getTransactionController.run.bind(getTransactionController)
);

