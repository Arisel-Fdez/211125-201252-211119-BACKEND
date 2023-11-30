import { Router } from 'express';
import { getUserController } from './controller/getUserController';

const rootRouter = Router();

// Definir las rutas que manejará este enrutador
rootRouter.get('/', getUserController);  // Ruta raíz que devuelve 200 OK

// Exportar el enrutador para usarlo en app.ts
export default rootRouter;
