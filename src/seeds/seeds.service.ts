import { Category, Ingredient, Preparation, Recipe, User } from '@modules';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoles } from 'src/enum';

@Injectable()
export class SeedsService implements OnModuleInit {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Category) private categoryModel: typeof Category,
    @InjectModel(Ingredient) private ingredienModel: typeof Ingredient,
    @InjectModel(Preparation) private preparationModel: typeof Preparation,
    @InjectModel(Recipe) private recipeModel: typeof Recipe,
  ) {}

  async onModuleInit() {
    // // modelda xatolik borligi sabab recipe preparation ingredient qo'shib bo'lmadi
    await this.seedUsers();
    await this.seedCategory();
    // await this.seedRecipe();
    // await this.seedPreparation();
    // await this.seedIngredient();
  }

  async seedUsers(): Promise<void> {
    const usersCount = await this.userModel.count();

    if (usersCount == 0) {
      // console.log(usersCount, "*")
      await this.userModel.create({
        id: 1,
        first_name: 'Abdulla',
        last_name: 'Zufarov',
        username: 'abdulla_zufarov',
        email: 'zufarovabdulla@gmail.com',
        password:
          '$2b$12$Co1KFMw7VTIG/WuRrHaE7eFGqVmhW6ZcU7KE4T8XZAy2RspGPSDfS',
        role: UserRoles.admin,
      });
    }
  }

  async seedCategory(): Promise<void> {
    const categoryCount = await this.categoryModel.count();

    if (categoryCount == 0) {
      await this.categoryModel.create({
        id: 1,
        name: 'Baking',
        image: 'baking.jpg',
      });
      await this.categoryModel.create({
        id: 2,
        name: 'Frying',
        image: 'frying.jpg',
      });
      await this.categoryModel.create({
        id: 3,
        name: 'Roasting',
        image: 'roasting.jpg',
      });
      await this.categoryModel.create({
        id: 4,
        name: 'Steaming',
        image: 'steaming.jpg',
      });
      await this.categoryModel.create({
        id: 5,
        name: 'Boiling',
        image: 'qozonkabob.jpg',
      });
    }
  }

  async seedIngredient(): Promise<void> {
    const ingredientCount = await this.ingredienModel.count();

    if (ingredientCount == 0) {
      await this.ingredienModel.create({
        id: 1,
        ingredients: "1 kg kartoshka\n1kg go'sht\n1 piyola yog'",
      });
    }
  }

  async seedPreparation(): Promise<void> {
    const preparationCount = await this.preparationModel.count();

    if (preparationCount == 0) {
      await this.preparationModel.create({
        id: 1,
        preparations:
          "Kartoshhkalarni po'stini archamiz\n Qozonga yog'ni solib, yaxshilab qizdirib olamiz.",
      });
    }
  }

  async seedRecipe(): Promise<void> {
    const recipeCount = await this.recipeModel.count();

    if (recipeCount == 0) {
      await this.recipeModel.create({
        id: 1,
        name: "Qozonkabob",
        description: `Bayramlar yoki biron bir tadbirlarda ko’pincha nima tayyorlashni bilmaymiz. Ana shunday kunlarda qozon kabob taomi juda qo’l keladi. 

Bu retsept asosida tayyorlanilgan qozon kabob, og’izda erib ketadigan darajada yumshoqina bo’lib pishadi.`,
        image: 'qozonkabob.jpg',
        video: 'qozonkabob-video.mp4',
        rating: 3,
        cooking_time: '2 soat',
        yield: '2-3 kishi',
        is_confirmed: 'not confirmed',
        user_id: 1,
        category_id: 1,
        ingredient_id: 1,
        preparation_id: 1,
      });
    }
  }
}
