import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import CategoryModel from '../../../category/infraestructure/models/categoryModel';
import AccountModel from '../../../account/infraestructure/models/accountModel';

@Table({
    tableName: 'publication',
    timestamps: true
})
class TransactionModel extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    })
    public id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    public date!: Date;

    @Column({
        type: DataType.STRING(128),
        allowNull: false
    })
    public amount!: string;

    @Column({
        type: DataType.STRING(512),
        allowNull: false
    })
    public description!: string;

    @ForeignKey(() => CategoryModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public categoryId!: number;

    @BelongsTo(() => CategoryModel)
    public category!: CategoryModel;

    @ForeignKey(() => AccountModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    public accountId!: number;

    @BelongsTo(() => AccountModel)
    public account!: AccountModel;
}

export default TransactionModel;
