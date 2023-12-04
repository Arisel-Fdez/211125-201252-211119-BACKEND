"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const userPublicationModel_1 = __importDefault(require("../../../publication/infraestructure/models/userPublicationModel"));
const userModel_1 = __importDefault(require("../../../user/infraestructure/models/userModel"));
let CommentModel = class CommentModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_2.ForeignKey)(() => userModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
], CommentModel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_2.BelongsTo)(() => userModel_1.default, {
        onDelete: 'CASCADE' // Esta línea indica eliminación en cascada
    })
], CommentModel.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_2.ForeignKey)(() => userPublicationModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
], CommentModel.prototype, "publicationId", void 0);
__decorate([
    (0, sequelize_typescript_2.BelongsTo)(() => userPublicationModel_1.default)
], CommentModel.prototype, "publication", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
], CommentModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    })
], CommentModel.prototype, "content", void 0);
CommentModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'comment',
        timestamps: true
    })
], CommentModel);
exports.default = CommentModel;
