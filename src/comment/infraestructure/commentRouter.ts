import  express  from "express";

import { 
    commentController, deleteCommentController, getCommentsByUserIdController
    // otros controladores que necesite
} from "./dependencies";

export const commentRouter = express.Router();

// Ruta para agregar un nuevo comentario a una publicación
commentRouter.post(
    "/publication/:publicationId/usercomment/:userId", 
    commentController.run.bind(commentController)
);

commentRouter.delete(
    "/comment/:commentId", 
    deleteCommentController.run.bind(deleteCommentController)
);

// Ruta para obtener los comentarios de un usuario por su ID
commentRouter.get(
    "/user/:userId/comments", 
    getCommentsByUserIdController.run.bind(getCommentsByUserIdController)
);