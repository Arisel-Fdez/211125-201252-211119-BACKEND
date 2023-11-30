import express from 'express';
import { Signale } from 'signale';
import { initializeDatabase } from './database/sequelize'; 
import { userRouter } from './user/infraestructure/userRouter';
import { authRouter } from './auth/infraestructure/authRouter';
import * as admin from 'firebase-admin';
import serviceAccount from './user/infraestructure/backsocialmovil-firebase.json';
import { userPublicationRouter } from './publication/infraestructure/userPublicationRouter';
import { likeRouter } from './reaction/infraestructure/likeRouter';
import { commentRouter } from './comment/infraestructure/commentRouter';
import { coordinateRouter } from './location/infraestructure/coordinateRouter';

const app = express();
const signale = new Signale();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user',userRouter);
app.use("/login",authRouter);
app.use('/publication',userPublicationRouter);
app.use('/reaction',likeRouter)
app.use('/comment',commentRouter)
app.use('/gps',coordinateRouter)

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
        app.listen(PORT, () => {
            signale.success(`Server online on port ${PORT}`);
        });
    } catch (error) {
        signale.error("Error al iniciar el servidor:", error);
    }
}

// Inicia todo
startServer();