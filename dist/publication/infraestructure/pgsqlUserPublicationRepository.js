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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgsqlUserPublicationRepository = void 0;
const userModel_1 = __importDefault(require("../../user/infraestructure/models/userModel"));
const userPublication_1 = require("../domain/userPublication");
const userPublicationModel_1 = __importDefault(require("./models/userPublicationModel"));
class PgsqlUserPublicationRepository {
    addPublication(userId, description, multimedia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar el usuario para obtener su nombre
                const user = yield userModel_1.default.findByPk(userId);
                if (!user)
                    throw new Error('Usuario no encontrado.');
                // Usando Sequelize para crear una nueva publicación
                const createdPublication = yield userPublicationModel_1.default.create({
                    userId,
                    description,
                    multimedia,
                    // Aquí puedes agregar otros campos si son necesarios
                });
                // Aquí deberías retornar también el nombre del usuario si es necesario
                return new userPublication_1.UserPublication(createdPublication.id, user.name, createdPublication.description, createdPublication.multimedia);
            }
            catch (error) {
                console.error("Error in PgsqlUserPublicationRepository:", error);
                return null;
            }
        });
    }
    getAllPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Aquí incluimos el modelo del usuario y especificamos los atributos que queremos
                const publications = yield userPublicationModel_1.default.findAll({
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name'], // Asegúrate de que estos nombres coincidan con los de tu modelo de usuario
                        }]
                });
                // Mapeamos el resultado para incluir el nombre y apellido del usuario
                return publications.map(pub => {
                    // Convertimos el userId a string si es necesario, para coincidir con la definición de tu clase UserPublication
                    const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                    return new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
                });
            }
            catch (error) {
                console.error("Error al obtener todas las publicaciones:", error);
                return [];
            }
        });
    }
    getPublicationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield userPublicationModel_1.default.findAll({
                    where: { userId },
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name', 'profilePicture'],
                        }]
                });
                return publications.map(pub => new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, pub.user.profilePicture, `${pub.user.name} ${pub.user.last_name}`));
            }
            catch (error) {
                console.error("Error en PgsqlUserPublicationRepository:", error);
                return [];
            }
        });
    }
    getAudioPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield userPublicationModel_1.default.findAll({
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name'],
                        }]
                });
                // Definimos las extensiones de audio válidas
                const audioExtensions = ['.mp3', '.wav', '.aac'];
                // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en extensiones de audio
                const audioPublications = publications.filter(pub => audioExtensions.some(ext => pub.multimedia && pub.multimedia.includes(ext + '?alt=media')));
                // Mapeamos el resultado para incluir el nombre completo del usuario
                return audioPublications.map(pub => {
                    const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                    return new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
                });
            }
            catch (error) {
                console.error("Error al obtener publicaciones de audio:", error);
                return [];
            }
        });
    }
    getGifsPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield userPublicationModel_1.default.findAll({
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name'],
                        }]
                });
                // Definimos la extensión de GIF válida
                const gifExtension = '.gif';
                // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en la extensión de GIF
                const gifPublications = publications.filter(pub => pub.multimedia && pub.multimedia.includes(gifExtension + '?alt=media'));
                // Mapeamos el resultado para incluir el nombre completo del usuario
                return gifPublications.map(pub => {
                    const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                    return new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
                });
            }
            catch (error) {
                console.error("Error al obtener publicaciones de GIFs:", error);
                return [];
            }
        });
    }
    getImagesPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield userPublicationModel_1.default.findAll({
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name'],
                        }]
                });
                // Definimos las extensiones de imagen válidas
                const imageExtensions = ['.jpg', '.jpeg', '.png', '.bmp'];
                // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en extensiones de imagen
                const imagePublications = publications.filter(pub => imageExtensions.some(ext => pub.multimedia && pub.multimedia.includes(ext + '?alt=media')));
                // Mapeamos el resultado para incluir el nombre completo del usuario
                return imagePublications.map(pub => {
                    const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                    return new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
                });
            }
            catch (error) {
                console.error("Error al obtener publicaciones de imágenes:", error);
                return [];
            }
        });
    }
    getPDFPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield userPublicationModel_1.default.findAll({
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name'],
                        }]
                });
                // Definimos la extensión de archivo PDF válida
                const pdfExtension = '.pdf';
                // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en la extensión PDF
                const pdfPublications = publications.filter(pub => pub.multimedia && pub.multimedia.includes(pdfExtension + '?alt=media'));
                // Mapeamos el resultado para incluir el nombre completo del usuario
                return pdfPublications.map(pub => {
                    const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                    return new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
                });
            }
            catch (error) {
                console.error("Error al obtener publicaciones de PDF:", error);
                return [];
            }
        });
    }
    getVideosPublications() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const publications = yield userPublicationModel_1.default.findAll({
                    include: [{
                            model: userModel_1.default,
                            attributes: ['name', 'last_name'],
                        }]
                });
                // Definimos las extensiones de archivo de video válidas
                const videoExtensions = ['.mp4', '.mov', '.wmv', '.avi'];
                // Filtramos las publicaciones para incluir solo aquellas con URLs que terminan en extensiones de video
                const videoPublications = publications.filter(pub => videoExtensions.some(ext => pub.multimedia && pub.multimedia.includes(ext + '?alt=media')));
                // Mapeamos el resultado para incluir el nombre completo del usuario
                return videoPublications.map(pub => {
                    const userFullName = pub.user ? `${pub.user.name} ${pub.user.last_name}` : '';
                    return new userPublication_1.UserPublication(pub.id, pub.userId.toString(), pub.description, pub.multimedia, userFullName);
                });
            }
            catch (error) {
                console.error("Error al obtener publicaciones de video:", error);
                return [];
            }
        });
    }
    deletePublicationById(publicationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userPublicationModel_1.default.destroy({
                    where: {
                        id: publicationId
                    }
                });
            }
            catch (error) {
                console.error("Error al eliminar la publicación:", error);
                throw error;
            }
        });
    }
}
exports.PgsqlUserPublicationRepository = PgsqlUserPublicationRepository;
