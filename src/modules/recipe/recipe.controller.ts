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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Protected, Roles } from '@decorators';
import { multerConfig } from '@config';
import { RecipeService } from './recipe.service';
import { Recipe } from './models';
import { CreateRecipeDto, UpdateRecipeDto } from './dtos';
import { UserRoles } from 'src/enum';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private service: RecipeService) {}

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Barcha recipelarni olish' })
  @Get('/')
  async getAllRecipes(): Promise<Recipe[] | string> {
    return await this.service.getAllRecipes();
  }

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: "Recipeni idsi bo'yicha olish" })
  @Get('/:recipeId')
  async getRecipeById(
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ): Promise<Recipe | string> {
    return await this.service.getRecipeById(recipeId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Yangi recipe yaratish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'image', maxCount: 1},
    {name: 'video', maxCount: 1},
  ], multerConfig))
  async createUser(
    @Body() payload: CreateRecipeDto,
    @UploadedFiles() files: {image: Express.Multer.File[], video: Express.Multer.File[]},
  ): Promise<void> {
    console.log(files)
    await this.service.createRecipe({
      ...payload,
      image: files?.image ? files?.image[0]?.filename : "",
      video: files?.video ? files?.video[0]?.filename : ""
    });
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Recipeni update qilish' })
  @ApiConsumes('multipart/form-data')
  @Patch('/update/:recipeId')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'image', maxCount: 1},
    {name: 'video', maxCount: 1},
  ], multerConfig))
  async updateRecipe(
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() payload: UpdateRecipeDto,
    @UploadedFiles() files: {image: Express.Multer.File[], video: Express.Multer.File[]},
  ): Promise<void | string> {
    console.log(files, "&")
    return await this.service.updateRecipe(recipeId, {
      ...payload,
      image: files?.image ? files?.image[0]?.filename : "",
      video: files?.video ? files?.video[0]?.filename : ""
    });
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete/:recipeId')
  @ApiOperation({ summary: "Recipeni idsi bo'yicha o'chirish" })
  async deleteRecipe(
    @Param('recipeId', ParseIntPipe) recipeId: number,
  ): Promise<void | string> {
    return await this.service.deleteRecipe(recipeId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete')
  @ApiOperation({ summary: "Hamma Recipelarni o'chirish" })
  async deleteAllRecipes(): Promise<void | string> {
    return await this.service.deleteAllRecipes();
  }
}
