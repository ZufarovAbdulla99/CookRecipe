import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { unlink } from 'fs';
import { join } from 'path';
import { Category } from './models';
import { ICreateCategoryRequest, IUpdateCategoryRequest } from './interfaces';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async getAllCategories(): Promise<Category[] | string> {
    const categories = await this.categoryModel.findAll({
      include: [],
    });
    if (!categories) {
      return 'Any Category not found';
    }
    return categories;
  }

  async getCategoryById(categoryId: number): Promise<Category | string> {
    const category = await this.categoryModel.findByPk(categoryId, {
      include: [],
    });
    if (!category) {
      return 'Category not found';
    }
    return category;
  }

  async createCategory(payload: ICreateCategoryRequest): Promise<void> {
    await this.categoryModel.create({
      name: payload.name,
      image: payload.image,
    });
  }

  async updateCategory(
    categoryId: number,
    payload: IUpdateCategoryRequest,
  ): Promise<void | string> {
    const existCategory = await this.categoryModel.findByPk(categoryId);

    if (!existCategory) {
      return 'Category not found';
    }

    if (existCategory.image && existCategory.image != 'user.png') {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existCategory.image),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    await existCategory.update({
      name: payload.name,
      image: payload.image,
    });
  }

  async deleteCategory(categoryId: number): Promise<void | string> {
    const existCategory = await this.categoryModel.findByPk(categoryId);

    if (!existCategory) {
      return 'Category not found';
    }

    if (existCategory.image && existCategory.image != 'user.png') {
      unlink(
        join(__dirname, '..', '..', '..', 'uploads', existCategory.image),
        (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        },
      );
    }

    await this.categoryModel.destroy({ where: { id: categoryId } });
  }

  async deleteAllCategories(): Promise<void | string> {
    const allCategories = await this.categoryModel.findAll();

    if (!allCategories[0]?.dataValues) {
      return 'Any Category not found';
    }

    allCategories.forEach((c) => {
      if (c.image && c.image != 'user.png') {
        unlink(join(__dirname, '..', '..', '..', 'uploads', c.image), (err) => {
          if (err) {
            console.log("File o'chirishda xatolik yoki fayl mavjud emas");
          }
        });
      }
    });

    await this.categoryModel.truncate();
  }
}
