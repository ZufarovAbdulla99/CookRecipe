import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdateIngredientRequest } from '../interfaces';

export class UpdateIngredientDto implements IUpdateIngredientRequest
{
  @ApiProperty({
    type: String,
    required: false,
    example: "Taom tayyorlash uchun kerak bo'ladigan mahsulotlarni yozing",
  })
  @IsOptional()
  @IsString()
  ingredients?: string;
}