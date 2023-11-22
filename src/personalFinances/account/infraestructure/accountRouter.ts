import express from "express";
import { addBalanceController,
    createAccountController,
    getAccountBalanceController,
    reduceBalanceController,
    getAllAccountsController,
    deleteAccountController } from "./dependencies";

export const accountRouter = express.Router();

accountRouter.put(
    "/balance/add/:userId",
    addBalanceController.run.bind(addBalanceController)
);

accountRouter.post(
    "/create",
    createAccountController.run.bind(createAccountController)
);

accountRouter.get(
    "/get/balance/:id/:userId",
    getAccountBalanceController.run.bind(getAccountBalanceController)
);

accountRouter.put(
    "/balance/reduce/:userId",
    reduceBalanceController.run.bind(reduceBalanceController)
);

accountRouter.get(
    "/list/all",
    getAllAccountsController.run.bind(getAllAccountsController)
);

accountRouter.delete(
    "/delete/:id/:userId",
    deleteAccountController.run.bind(deleteAccountController)
);