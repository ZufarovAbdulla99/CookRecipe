import { RecipeRoles } from '../models';

export declare interface IUpdateRecipeRequest {
  name?: string;
  description?: string;
  image?: string;
  video?: string;
  rating?: number;
  cooking_time?: string;
  yield?: string;
  is_confirmed?: RecipeRoles;
  user_id?: number;
  category_id?: number;
  ingredient_id?: number
  preparation_id?: number
}