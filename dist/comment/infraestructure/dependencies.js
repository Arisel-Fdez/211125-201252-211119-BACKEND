"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPublicationIdController = exports.getCommentsByPublicationIdUseCase = exports.getCommentsByUserIdController = exports.getCommentsByUserIdUseCase = exports.deleteCommentController = exports.deleteCommentUseCase = exports.commentController = exports.addCommentUseCase = exports.pgsqlCommentRepository = void 0;
const pgsqlCommentRepository_1 = require("./pgsqlCommentRepository");
const addCommentUseCase_1 = require("../application/addCommentUseCase");
const commentController_1 = require("./controller/commentController");
const deleteCommentController_1 = require("./controller/deleteCommentController");
const deleteCommentUseCase_1 = require("../application/deleteCommentUseCase");
const getCommentsByUserIdController_1 = require("./controller/getCommentsByUserIdController");
const getCommentsByUserIdUseCase_1 = require("../application/getCommentsByUserIdUseCase");
const getCommentsByPublicationIdController_1 = require("./controller/getCommentsByPublicationIdController");
const getCommentsByPublicationIdUseCase_1 = require("../application/getCommentsByPublicationIdUseCase");
exports.pgsqlCommentRepository = new pgsqlCommentRepository_1.PgsqlCommentRepository();
exports.addCommentUseCase = new addCommentUseCase_1.AddCommentUseCase(exports.pgsqlCommentRepository);
exports.commentController = new commentController_1.CommentController(exports.addCommentUseCase);
exports.deleteCommentUseCase = new deleteCommentUseCase_1.DeleteCommentUseCase(exports.pgsqlCommentRepository);
exports.deleteCommentController = new deleteCommentController_1.DeleteCommentController(exports.deleteCommentUseCase);
exports.getCommentsByUserIdUseCase = new getCommentsByUserIdUseCase_1.GetCommentsByUserIdUseCase(exports.pgsqlCommentRepository);
exports.getCommentsByUserIdController = new getCommentsByUserIdController_1.GetCommentsByUserIdController(exports.getCommentsByUserIdUseCase);
exports.getCommentsByPublicationIdUseCase = new getCommentsByPublicationIdUseCase_1.GetCommentsByPublicationIdUseCase(exports.pgsqlCommentRepository);
exports.getCommentsByPublicationIdController = new getCommentsByPublicationIdController_1.GetCommentsByPublicationIdController(exports.getCommentsByPublicationIdUseCase);