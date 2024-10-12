import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Preparation } from './models';
import { PreparationService } from './preparation.service';
import { PreparationController } from './preparation.controller';

@Module({
  imports: [SequelizeModule.forFeature([Preparation])],
  providers: [PreparationService],
  controllers: [PreparationController],
})
export class PreparationModule {}