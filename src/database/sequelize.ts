import dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import UserModel from '../user/infraestructure/models/userModel';
<<<<<<< HEAD
import AccountModel from '../personalFinances/account/infraestructure/models/accountModel';
import TransactionModel from '../personalFinances/transaction/infraestructure/models/transactionModel';
import CategoryModel from '../personalFinances/category/infraestructure/models/categoryModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    database: "postgres",
    username: "postgres",
    password: "232001",
    models: [UserModel, AccountModel, TransactionModel, CategoryModel],
=======
import UserPublicationModel from '../publication/infraestructure/models/userPublicationModel';
import LikeModel from '../reaction/infraestructure/models/likeModel';
import CommentModel from '../comment/infraestructure/models/commentModel';
import CoordinateModel from '../location/infraestructure/models/coordinateModel';

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    database: 'postgres',
    username: 'postgres',
    password: 'yeremi224',
    models: [UserModel, UserPublicationModel, LikeModel, CommentModel, CoordinateModel],
>>>>>>> origin/211119-FullBack
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