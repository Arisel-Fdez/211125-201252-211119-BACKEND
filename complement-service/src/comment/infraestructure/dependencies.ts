import { PgsqlCommentRepository } from "./pgsqlCommentRepository";

import { AddCommentUseCase } from "../application/addCommentUseCase";
import { CommentController } from "./controller/commentController";
import { DeleteCommentController } from "./controller/deleteCommentController";
import { DeleteCommentUseCase } from "../application/deleteCommentUseCase";
import { GetCommentsByUserIdController } from "./controller/getCommentsByUserIdController";
import { GetCommentsByUserIdUseCase } from "../application/getCommentsByUserIdUseCase";

export const pgsqlCommentRepository = new PgsqlCommentRepository();

export const addCommentUseCase = new AddCommentUseCase(pgsqlCommentRepository);
export const commentController = new CommentController(addCommentUseCase);

export const deleteCommentUseCase = new DeleteCommentUseCase(pgsqlCommentRepository);
export const deleteCommentController = new  DeleteCommentController(deleteCommentUseCase);

export const getCommentsByUserIdUseCase = new GetCommentsByUserIdUseCase(pgsqlCommentRepository);
export const getCommentsByUserIdController = new GetCommentsByUserIdController(getCommentsByUserIdUseCase);