import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import UserModel from '../user/infraestructure/models/userModel';
import AccountModel from '../personalFinances/account/infraestructure/models/accountModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: "postgres",
    username: "postgres",
    password: "232001",
    models: [UserModel, AccountModel],
});

export async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync({ force: false });
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err);
        process.exit(1);  // Cierra la aplicación si hay un error de conexión
    }
}