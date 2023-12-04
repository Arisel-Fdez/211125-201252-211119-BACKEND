"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ListAllUsersController = void 0;
const admin = __importStar(require("firebase-admin"));
class ListAllUsersController {
    constructor(listAllUserUseCase) {
        this.listAllUserUseCase = listAllUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.listAllUserUseCase.run();
            // Añade el token a la URL de profilePicture de cada usuario
            const usersWithDownloadURLs = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                if (user.profilePicture) {
                    const bucket = admin.storage().bucket();
                    // Suponiendo que profilePicture es el nombre del archivo en Firebase Storage
                    const fileName = decodeURIComponent(user.profilePicture.split('/o/')[1].split('?alt=media')[0]);
                    const file = bucket.file(fileName);
                    try {
                        const [downloadURL] = yield file.getSignedUrl({
                            action: 'read',
                            expires: '03-09-2491'
                        });
                        user.profilePicture = downloadURL;
                    }
                    catch (error) {
                        console.error("Error al obtener la URL de descarga:", error);
                        // Opcional: establecer profilePicture en null o manejar el error de otra manera
                    }
                }
                return user;
            })));
            res.status(200).send(usersWithDownloadURLs);
        });
    }
}
exports.ListAllUsersController = ListAllUsersController;
