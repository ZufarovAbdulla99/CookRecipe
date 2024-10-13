import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from './models';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';

@Module({
  imports: [SequelizeModule.forFeature([Recipe])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule {}
