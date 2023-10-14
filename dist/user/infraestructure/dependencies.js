"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.deletedUsersUseCase = exports.listAllUsersController = exports.listAllUsersUseCase = exports.addUsersController = exports.addUsersUseCase = exports.pgsqlUsersRepository = void 0;
const pgsqlUserRepository_1 = require("./pgsqlUserRepository");
const addUserUseCase_1 = require("../application/addUserUseCase");
const addUserController_1 = require("./controller/addUserController");
const listAllUserController_1 = require("./controller/listAllUserController");
const listAllUserUseCase_1 = require("../application/listAllUserUseCase");
const deleteUserUseCase_1 = require("../application/deleteUserUseCase");
const deleteUserController_1 = require("./controller/deleteUserController");
exports.pgsqlUsersRepository = new pgsqlUserRepository_1.PgsqlUserRepository();
exports.addUsersUseCase = new addUserUseCase_1.AddUserUseCase(exports.pgsqlUsersRepository);
exports.addUsersController = new addUserController_1.AddUsersController(exports.addUsersUseCase);
exports.listAllUsersUseCase = new listAllUserUseCase_1.ListAllUserUseCase(exports.pgsqlUsersRepository);
exports.listAllUsersController = new listAllUserController_1.ListAllUsersController(exports.listAllUsersUseCase);
exports.deletedUsersUseCase = new deleteUserUseCase_1.DeleteUserUseCase(exports.pgsqlUsersRepository);
exports.deleteUserController = new deleteUserController_1.DeleteUserController(exports.deletedUsersUseCase);
