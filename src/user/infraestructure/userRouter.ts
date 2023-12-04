import express from "express";
import { addUsersController, listAllUsersController, deleteUserController } from "./dependencies";

export const userRouter = express.Router();

userRouter.post(
    "/create",
    addUsersController.run.bind(addUsersController)
);

userRouter.get(
    "/",
    listAllUsersController.run.bind(listAllUsersController)
);

userRouter.delete(
    "/delete/:id",
    deleteUserController.run.bind(deleteUserController)
);

