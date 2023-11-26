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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signale_1 = require("signale");
const cors_1 = __importDefault(require("cors"));
const admin = __importStar(require("firebase-admin"));
const morgan_1 = __importDefault(require("morgan"));
const backsocialmovil_firebase_json_1 = __importDefault(require("./user/infraestructure/backsocialmovil-firebase.json"));
const sequelize_1 = require("./database/sequelize");
const userRouter_1 = require("./user/infraestructure/userRouter");
const authRouter_1 = require("./auth/infraestructure/authRouter");
const accountRouter_1 = require("./personalFinances/account/infraestructure/accountRouter");
const transactionRouter_1 = require("./personalFinances/transaction/infraestructure/transactionRouter");
//importaciones servicios de eventos
const dependencies_1 = require("./personalFinances/transaction/infraestructure/dependencies");
const dependencies_2 = require("./personalFinances/account/infraestructure/dependencies");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const signale = new signale_1.Signale();
app.use((0, morgan_1.default)('dev'));
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use('/', userRouter_1.userRouter);
app.use("/", authRouter_1.authRouter);
app.use("/", accountRouter_1.accountRouter);
app.use("/", transactionRouter_1.transactionRouter);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inicializa Firebase Admin
            admin.initializeApp({
                credential: admin.credential.cert(backsocialmovil_firebase_json_1.default),
                storageBucket: 'backsocialmovil.appspot.com'
            });
            signale.success("Firebase Admin initialized successfully");
            // Luego inicializa y conecta la base de datos
            yield (0, sequelize_1.initializeDatabase)();
            //Inicializacion de los suscriptores para recibir eventos, si se cambia la estructura de carpetas, revisar imporataciones
            yield (0, dependencies_1.createTransactionServices)();
            yield (0, dependencies_2.createAccountServices)();
            // Después inicia el servidor Express
            app.listen(PORT, () => {
                signale.success(`Servidor corriendo en http://localhost:${PORT}`);
            });
        }
        catch (error) {
            signale.error("Error al iniciar el servidor:", error);
        }
    });
}
startServer();
