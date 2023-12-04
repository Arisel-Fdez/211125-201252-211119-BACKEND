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
const categoryModel_1 = __importDefault(require("../../../category/infraestructure/models/categoryModel"));
const accountModel_1 = __importDefault(require("../../../account/infraestructure/models/accountModel"));
let TransactionModel = class TransactionModel extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
], TransactionModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false
    })
], TransactionModel.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN, // Cambiar a BOOLEAN
        allowNull: false
    })
], TransactionModel.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
], TransactionModel.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(512),
        allowNull: false
    })
], TransactionModel.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => categoryModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
], TransactionModel.prototype, "categoriId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => categoryModel_1.default)
], TransactionModel.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => accountModel_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
], TransactionModel.prototype, "accountId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => accountModel_1.default, {
        onDelete: 'CASCADE' // Esta línea indica eliminación en cascada
    })
], TransactionModel.prototype, "account", void 0);
TransactionModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'transaction',
        timestamps: true
    })
], TransactionModel);
exports.default = TransactionModel;
