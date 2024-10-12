import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'preparation', timestamps: true })
export class Preparation extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  steps: string;
}
