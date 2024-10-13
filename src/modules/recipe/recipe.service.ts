import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from './models';
import { ICreateRecipeRequest, IUpdateRecipeRequest } from './interfaces';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe) private recipeModel: typeof Recipe) {}

  async getAllRecipes(): Promise<Recipe[] | string> {
    const recipes = await this.recipeModel.findAll({
      include: [],
    });
    // console.log(data[0]?.dataValues)
    if (!recipes) {
      return 'Any Recipe not found';
    }
    return recipes;
  }

  async getRecipeById(recipeId: number): Promise<Recipe | string> {
    const recipe = await this.recipeModel.findByPk(recipeId, { include: [] });
    if (!recipe) {
      return 'Recipe not found';
    }
    return recipe;
  }

  async createRecipe(payload: ICreateRecipeRequest): Promise<void> {
    await this.recipeModel.create({
      name: payload.name,
      description: payload.description,
      image: payload.image,
      video: payload.video,
      rating: payload.rating,
      cooking_time: payload.cooking_time,
      yield: payload.yield,
      is_confirmed: payload.is_confirmed,
      user_id: payload.user_id,
      category_id: payload.category_id,
      ingredient_id: payload.ingredient_id,
      preparation_id: payload.preparation_id
    });
  }

  async updateRecipe(
    recipeId: number,
    payload: IUpdateRecipeRequest,
  ): Promise<void | string> {
    const existRecipe = await this.recipeModel.findByPk(recipeId);

    if (!existRecipe) {
      return "Recipe not found";
    }

    

    // Oldingi rasmini o'chirib tashash
    if (existRecipe.image && existRecipe.image != 'user.png') {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existRecipe.image),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    // Oldingi videosini o'chirib tashash
    if (existRecipe.video) {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existRecipe.video),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    await existRecipe.update({
      name: payload.name,
      description: payload.description,
      image: payload?.image ? payload?.image : existRecipe.image,
      video: payload?.video ? payload?.video : existRecipe.video,
      rating: payload.rating,
      cooking_time: payload.cooking_time,
      yield: payload.yield,
      is_confirmed: payload.is_confirmed,
      user_id: payload.user_id,
      category_id: payload.category_id,
      ingredient_id: payload.ingredient_id,
      preparation_id: payload.preparation_id
    });
  }

  async deleteRecipe(recipeId: number): Promise<void | string> {
    const existRecipe = await this.recipeModel.findByPk(recipeId);

    if (!existRecipe) {
      return 'Recipe not found';
    }

    if (existRecipe.image && existRecipe.image != 'user.png') {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existRecipe.image),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    if (existRecipe.video) {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existRecipe.video),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    await this.recipeModel.destroy({ where: { id: recipeId } });
  }

  async deleteAllRecipes(): Promise<void | string> {
    const allRecipes = await this.recipeModel.findAll();

    // console.log(allUsers[0]?.dataValues)
    if (!allRecipes[0]?.dataValues) {
      return 'Any Recipe not found';
    }

    allRecipes.forEach((r) => {
      if (r.image && r.image != 'user.png') {
        unlink(join(__dirname, '..', '..', '..', 'uploads', r.image), (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        });
      }
    });

    allRecipes.forEach((r) => {
      if (r.video) {
        unlink(join(__dirname, '..', '..', '..', 'uploads', r.video), (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        });
      }
    });

    await this.recipeModel.truncate();
  }
}
