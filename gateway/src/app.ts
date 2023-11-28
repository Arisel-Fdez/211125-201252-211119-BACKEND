import express, {Application} from 'express';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

import dotenv from 'dotenv';
import { Signale } from "signale";

const app:Application = express();
const signale = new Signale();

app.use(morgan('dev'));

dotenv.config();
const PORT = process.env.PORT || 3000;

//server1
app.use('/api/v1/login', proxy('administrador-service.up.railway.app'));
app.use('/api/v1/accout', proxy('administrador-service.up.railway.app'));
app.use('/api/v1/transaction', proxy('administrador-service.up.railway.app'));
//server 2
app.use('/api/v1/user',proxy('https://open-bait-production.up.railway.app'));
app.use('/api/v1/login',proxy('https://open-bait-production.up.railway.app'));
app.use('/api/v1/publication',proxy('https://open-bait-production.up.railway.app'));
app.use('/api/v1/reaction',proxy('https://open-bait-production.up.railway.app'));
app.use('/api/v1/comment',proxy('https://open-bait-production.up.railway.app'));
app.use('/api/v1/gps',proxy('https://open-bait-production.up.railway.app'));

app.listen(PORT,() => {
    signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});