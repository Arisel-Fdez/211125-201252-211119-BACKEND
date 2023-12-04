import  express  from "express";
import { getUserController } from './controller/getUserController';

export const Routeroot = express.Router();

// Definir las rutas que manejará este enrutador
Routeroot.get('/', getUserController);  // Ruta raíz que devuelve 200 OK



