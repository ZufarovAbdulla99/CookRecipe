import { Table, Model, Column, DataType, BelongsTo, HasOne } from 'sequelize-typescript';
import { Recipe } from 'src/modules/recipe';

@Table({ tableName: 'preparation', timestamps: true })
export class Preparation extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  steps: string;

  @HasOne(() => Recipe)
  recipe: Recipe
}
