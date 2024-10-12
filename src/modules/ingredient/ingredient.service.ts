import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from './models';
import { ICreateIngredientRequest, IUpdateIngredientRequest } from './interfaces';

@Injectable()
export class IngredientService {
  constructor(@InjectModel(Ingredient) private ingredientModel: typeof Ingredient) {}

  async getAllIngredients(): Promise<Ingredient[] | string> {
    const ingredients = await this.ingredientModel.findAll({
      include: [],
    });
    if (!ingredients) {
      return 'Any ingredient not found';
    }
    return ingredients;
  }

  async getIngredientById(ingredientId: number): Promise<Ingredient | string> {
    const ingredient = await this.ingredientModel.findByPk(ingredientId, {
      include: [],
    });
    if (!ingredient) {
      return 'Ingredient not found';
    }
    return ingredient;
  }

  async createIngredient(payload: ICreateIngredientRequest): Promise<void> {
    await this.ingredientModel.create({
        ingredients: payload.ingredients
    });
  }

  async updateIngredient(
    ingredientId: number,
    payload: IUpdateIngredientRequest,
  ): Promise<void | string> {
    const existIngredient = await this.ingredientModel.findByPk(ingredientId);

    if (!existIngredient) {
      return "Ingredient not found";
    }

    await existIngredient.update({
      ingredients: payload.ingredients
    });
  }

  async deleteIngredient(ingredientId: number): Promise<void | string> {
    const existIngredient = await this.ingredientModel.findByPk(ingredientId);

    if (!existIngredient) {
      return 'Ingredient not found';
    }

    await this.ingredientModel.destroy({ where: { id: ingredientId } });
  }

  async deleteAllIngredients(): Promise<void | string> {
    const allIngredients = await this.ingredientModel.findAll();

    if (!allIngredients[0]?.dataValues) {
      return 'Any Ingredient not found';
    }

    await this.ingredientModel.truncate();
  }
}