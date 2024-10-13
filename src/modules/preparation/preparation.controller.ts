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
import { PreparationService } from './preparation.service';
import { Preparation } from './models';
import { CreatePreparationDto, UpdatePreparationDto } from './dtos';
import { UserRoles } from 'src/enum';

@ApiTags('Preparation')
@Controller('preparation')
export class PreparationController {
  constructor(private service: PreparationService) {}

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: 'Barcha preparationlarni olish' })
  @Get('/')
  async getAllPreparations(): Promise<Preparation[] | string> {
    return await this.service.getAllPreparations();
  }

  // @ApiBearerAuth()
  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @ApiOperation({ summary: "Preparationni idsi bo'yicha olish" })
  @Get('/:preparationId')
  async getPreparationById(
    @Param('preparationId', ParseIntPipe) preparationId: number,
  ): Promise<Preparation | string> {
    return await this.service.getPreparationById(preparationId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Yangi preparation yaratish' })
  @Post('/add')
  async createPreparation(
    @Body() payload: CreatePreparationDto,
  ): Promise<void> {
    await this.service.createPreparation(payload);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @ApiOperation({ summary: 'Preparationni update qilish' })
  @Patch('/update/:preparationId')
  async updatePreparation(
    @Param('preparationId', ParseIntPipe) preparationId: number,
    @Body() payload: UpdatePreparationDto,
  ): Promise<void | string> {
    return await this.service.updatePreparation(preparationId, payload);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete/:preparationId')
  @ApiOperation({ summary: "Preparationni idsi bo'yicha o'chirish" })
  async deletePreparation(
    @Param('preparationId', ParseIntPipe) preparationId: number,
  ): Promise<void | string> {
    return await this.service.deletePreparation(preparationId);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/delete')
  @ApiOperation({ summary: "Hamma Preparationlarni o'chirish" })
  async deleteAllPreparations(): Promise<void | string> {
    return await this.service.deleteAllPreparations();
  }
}
