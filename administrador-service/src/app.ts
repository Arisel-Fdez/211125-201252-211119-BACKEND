import express from 'express';
import { Signale } from 'signale';
import cors from 'cors';
import * as admin from 'firebase-admin';
import morgan from 'morgan';
import serviceAccount from './user/infraestructure/backsocialmovil-firebase.json';
import { initializeDatabase } from './database/sequelize';
import { userRouter } from './user/infraestructure/userRouter';
import { authRouter } from './auth/infraestructure/authRouter';
import { accountRouter } from './personalFinances/account/infraestructure/accountRouter'
import { transactionRouter } from './personalFinances/transaction/infraestructure/transactionRouter'

const app = express();
app.use(cors());

app.use(morgan('dev'));

const signale = new Signale();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/', userRouter);
app.use("/", authRouter);
app.use("/", accountRouter);
app.use("/", transactionRouter);

async function startServer() {
    try {
        // Inicializa Firebase Admin
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
            storageBucket: 'backsocialmovil.appspot.com'
        });
        signale.success("Firebase Admin initialized successfully");

        // Luego inicializa y conecta la base de datos
        await initializeDatabase();

        // Después inicia el servidor Express
        app.listen(PORT,() => {
            signale.success(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor:", error);
    }
}

startServer();