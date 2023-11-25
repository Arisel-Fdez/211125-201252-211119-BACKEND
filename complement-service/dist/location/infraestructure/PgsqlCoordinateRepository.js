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
exports.PgsqlCoordinateRepository = void 0;
const coordinateModel_1 = __importDefault(require("./models/coordinateModel"));
const userModel_1 = __importDefault(require("../../user/infraestructure/models/userModel"));
const coordinate_1 = require("../domain/coordinate");
class PgsqlCoordinateRepository {
    addCoordinate(userId, latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findByPk(userId);
                if (!user)
                    throw new Error('Usuario no encontrado.');
                const coordinate = yield coordinateModel_1.default.create({
                    userId,
                    latitude,
                    longitude
                });
                return new coordinate_1.Coordinate(coordinate.id, coordinate.userId, coordinate.latitude, coordinate.longitude);
            }
            catch (error) {
                console.error("Error in PgsqlCoordinateRepository:", error);
                return null;
            }
        });
    }
    getCoordinatesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coordinates = yield coordinateModel_1.default.findAll({
                    where: { userId }
                });
                return coordinates.map(coordinate => new coordinate_1.Coordinate(coordinate.id, coordinate.userId, coordinate.latitude, coordinate.longitude));
            }
            catch (error) {
                console.error("Error in PgsqlCoordinateRepository getCoordinatesByUserId:", error);
                return [];
            }
        });
    }
}
exports.PgsqlCoordinateRepository = PgsqlCoordinateRepository;
