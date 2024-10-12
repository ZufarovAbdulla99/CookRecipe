import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'category', timestamps: true })
export class Category extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
}
