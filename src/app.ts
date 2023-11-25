import express from 'express';
import { Signale } from 'signale';
import cors from 'cors';
import * as admin from 'firebase-admin';
import serviceAccount from './user/infraestructure/backsocialmovil-firebase.json';
import { initializeDatabase } from './database/sequelize';
import { userRouter } from './user/infraestructure/userRouter';
import { authRouter } from './auth/infraestructure/authRouter';
import { accountRouter } from './personalFinances/account/infraestructure/accountRouter'
import { transactionRouter } from './personalFinances/transaction/infraestructure/transactionRouter'
//importaciones servicios de eventos
import { createTransactionServices } from './personalFinances/transaction/infraestructure/dependencies';
import { createAccountServices } from './personalFinances/account/infraestructure/dependencies';

const app = express();
app.use(cors()); // Usa cors como un middleware

const signale = new Signale();

app.use(express.json());
app.use('/user', userRouter);
app.use("/login", authRouter);
app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);

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

        //Inicializacion de los suscriptores para recibir eventos, si se cambia la estructura de carpetas, revisar imporataciones
        await createTransactionServices();
        await createAccountServices();
        // Después inicia el servidor Express
        app.listen(3000, () => {
            signale.success("Server online in port 3000");
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor:", error);
    }
}

startServer();