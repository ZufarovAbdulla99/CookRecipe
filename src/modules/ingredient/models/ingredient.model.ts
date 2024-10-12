import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'ingredient', timestamps: true })
export class Ingredient extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  ingredients: string;
}
