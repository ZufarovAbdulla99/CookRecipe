import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from 'src/modules/category';
import { Ingredient } from 'src/modules/ingredient';
import { Preparation } from 'src/modules/preparation';
import { User } from 'src/modules/user';

export enum RecipeRoles {
  confirmed = 'confirmed',
  not_confirmed = 'not confirmed',
}

@Table({ tableName: 'recipe', timestamps: true })
export class Recipe extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  description: string;

  @Column({ type: DataType.STRING(255), allowNull: false, })
  image?: string;

  @Column({ type: DataType.STRING(255), allowNull: false, })
  video?: string;

  @Column({ type: DataType.INTEGER, allowNull: false, validate: {min: 0, max: 5}, defaultValue: 0 })
  rating: number;

  @Column({ type: DataType.STRING(30), allowNull: true })
  cooking_time: string;

  @Column({ type: DataType.STRING(20), allowNull: false })
  yield: string;

  @Column({
    type: DataType.ENUM,
    values: [RecipeRoles.confirmed, RecipeRoles.not_confirmed],
    allowNull: false,
    defaultValue: RecipeRoles.not_confirmed,
  })
  is_confirmed: RecipeRoles;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION"})
  user_id: number;

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION"})
  category_id: number;

  @BelongsTo(() => Category)
  category: Category

  @ForeignKey(() => Ingredient)
  @Column({type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION"})
  ingredient_id: number

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient

  @ForeignKey(() => Preparation)
  @Column({type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION"})
  preparation_id: number

  @BelongsTo(() => Preparation)
  preparation: Preparation
}
