import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript';
import { Recipe } from 'src/modules/recipe';

@Table({ tableName: 'ingredient', timestamps: true })
export class Ingredient extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  ingredients: string;

  @HasOne(() => Recipe)
  recipe: Recipe
}
