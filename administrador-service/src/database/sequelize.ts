import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import UserModel from '../user/infraestructure/models/userModel';
import AccountModel from '../personalFinances/account/infraestructure/models/accountModel';
import TransactionModel from '../personalFinances/transaction/infraestructure/models/transactionModel';
import CategoryModel from '../personalFinances/category/infraestructure/models/categoryModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'roundhouse.proxy.rlwy.net',
    port: 12463, // Asegúrate de usar el puerto correcto para tu base de datos
    database: 'railway',
    username: 'postgres',
    password: '-f-ABE235Eb*fBcFcF34e1DbCG3e4Cd*',
    models: [UserModel, AccountModel, TransactionModel, CategoryModel],
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