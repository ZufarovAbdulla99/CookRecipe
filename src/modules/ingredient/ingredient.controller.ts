import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Protected, Roles } from '@decorators';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './models';
import { CreateIngredientDto, UpdateIngredientDto } from './dtos';
import { UserRoles } from 'src/enum';

@ApiTags('Ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private service: IngredientService) {}

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Barcha ingredientlarni olish' })
  @Get('/')
  async getAllIngredients(): Promise<Ingredient[] | string> {
    return await this.service.getAllIngredients();
  }

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: "Ingredientni idsi bo'yicha olish" })
  @Get('/:ingredientId')
  async getIngredientById(
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ): Promise<Ingredient | string> {
    return await this.service.getIngredientById(ingredientId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Yangi ingredient yaratish' })
  @Post('/add')
  async createIngredient(
    @Body() payload: CreateIngredientDto,
  ): Promise<void> {
    await this.service.createIngredient(payload);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Ingredientni update qilish' })
  @Patch('/update/:ingredientId')
  async updateIngredient(
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
    @Body() payload: UpdateIngredientDto,
  ): Promise<void | string> {
    return await this.service.updateIngredient(ingredientId, payload);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete/:ingredientId')
  @ApiOperation({ summary: "Ingredientni idsi bo'yicha o'chirish" })
  async deleteIngredient(
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ): Promise<void | string> {
    return await this.service.deleteIngredient(ingredientId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete')
  @ApiOperation({ summary: "Hamma ingredientlarni o'chirish" })
  async deleteAllIngredients(): Promise<void | string> {
    return await this.service.deleteAllIngredients();
  }
}