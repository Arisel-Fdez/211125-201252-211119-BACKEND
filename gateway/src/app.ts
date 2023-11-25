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

app.use('/api/v1/orders', proxy('http://localhost:3001'));
app.use('/api/v1/inventories',proxy('http://localhost:3002'))

app.listen(PORT,() => {
    signale.success(`Servidor corriendo en http://localhost:${PORT}`);
});