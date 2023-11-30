"use strict";
// GetUserPublicationsController.js
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
exports.GetUserPublicationsController = void 0;
const admin = __importStar(require("firebase-admin"));
class GetUserPublicationsController {
    constructor(getUserPublicationsUseCase) {
        this.getUserPublicationsUseCase = getUserPublicationsUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId);
                if (isNaN(userId)) {
                    return res.status(400).send({ status: "error", message: "ID de usuario inválido." });
                }
                let publications = yield this.getUserPublicationsUseCase.run(userId);
                // Procesa cada publicación para obtener URLs firmadas
                publications = yield Promise.all(publications.map((publication) => __awaiter(this, void 0, void 0, function* () {
                    publication = yield this.processPublication(publication);
                    return publication;
                })));
                res.status(200).send({ status: "success", data: publications });
            }
            catch (error) {
                console.error("Error en GetUserPublicationsController:", error);
                res.status(500).send({ status: "error", message: "Error interno del servidor." });
            }
        });
    }
    processPublication(publication) {
        return __awaiter(this, void 0, void 0, function* () {
            const bucket = admin.storage().bucket();
            if (publication.multimedia) {
                publication.multimedia = yield this.getSignedUrl(bucket, publication.multimedia);
            }
            if (publication.userProfile) {
                publication.userProfile = yield this.getSignedUrl(bucket, publication.userProfile);
            }
            return publication;
        });
    }
    getSignedUrl(bucket, url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
                const file = bucket.file(fileName);
                const [downloadURL] = yield file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491' // Ajusta la fecha de expiración según tus necesidades
                });
                return downloadURL;
            }
            catch (error) {
                console.error("Error al obtener la URL de descarga:", error);
                return url; // Devuelve la URL original en caso de error
            }
        });
    }
}
exports.GetUserPublicationsController = GetUserPublicationsController;
