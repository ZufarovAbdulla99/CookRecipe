import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected, Roles } from '@decorators';
import { multerConfig } from '@config';
import { Category } from './models';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { UserRoles } from '../user';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Barcha categorylarni olish' })
  @Get('/')
  async getAllCategories(): Promise<Category[] | string> {
    return await this.service.getAllCategories();
  }

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: "Categoryni idsi bo'yicha olish" })
  @Get('/:categoryId')
  async getCategoryById(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Category | string> {
    return await this.service.getCategoryById(categoryId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Yangi category yaratish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createCategory(
    @Body() payload: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    console.log(payload, "**")
    await this.service.createCategory({ ...payload, image: image ? image.filename : ""});
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Categoryni update qilish' })
  @ApiConsumes('multipart/form-data')
  @Patch('/update/:categoryId')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void | string> {
    return await this.service.updateCategory(categoryId, {
      ...payload,
      image: image.filename,
    });
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete/:categoryId')
  @ApiOperation({ summary: "Categoryni idsi bo'yicha o'chirish" })
  async deleteCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<void | string> {
    return await this.service.deleteCategory(categoryId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete')
  @ApiOperation({ summary: "Hamma Categorylarni o'chirish" })
  async deleteAllCategories(): Promise<void | string> {
    return await this.service.deleteAllCategories();
  }
}
