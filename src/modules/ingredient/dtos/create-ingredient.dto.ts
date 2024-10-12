import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateIngredientRequest } from '../interfaces';

export class CreateIngredientDto implements ICreateIngredientRequest
{
  @ApiProperty({
    type: String,
    required: true,
    example: "Taom tayyorlash uchun kerak bo'ladigan mahsulotlarni yozing",
  })
  @IsNotEmpty()
  @IsString()
  ingredients: string;
}