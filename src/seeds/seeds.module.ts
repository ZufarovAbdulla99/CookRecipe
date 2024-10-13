import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category, Ingredient, Preparation, Recipe, User } from '@modules';

@Module({
  imports: [SequelizeModule.forFeature([User, Category, Ingredient, Preparation, Recipe])],
  providers: [SeedsService],
})
export class SeedsModule {}
