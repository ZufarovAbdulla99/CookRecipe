import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdatePreparationRequest } from '../interfaces';

export class UpdatePreparationDto implements IUpdatePreparationRequest
{
  @ApiProperty({
    type: String,
    required: false,
    example: "Taom tayyorlash bosqichlarini yozing",
  })
  @IsOptional()
  @IsString()
  steps?: string;
}