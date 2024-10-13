import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateRecipeRequest } from '../interfaces';
import { RecipeRoles } from '../models';

export class CreateRecipeDto implements Omit<ICreateRecipeRequest, 'image' | 'video'> {
  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe",
    example: "Osh"
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: "Recipe haqida ma'lumot yozing",
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  description: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  video?: any;

  @ApiProperty({
    type: Number,
    required: false,
    description: "Recipe reytingi kiritiladi",
    example: 0
  })
  @IsOptional()
  @IsNumberString()
  rating?: number;

  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe pishirish vaqti",
  })
  @IsOptional()
  @IsString()
  cooking_time: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe porsiyasi",
  })
  @IsOptional()
  @IsString()
  yield: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe admin tomonidan tasdiqlangan yoki tasdiqlanmaganligi",
    example: RecipeRoles.not_confirmed
  })
  @IsOptional()
  @IsString()
  @IsEnum(RecipeRoles)
  is_confirmed: RecipeRoles;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi userga tegishli user idsi berilishi shart',
  })
  @IsNumberString()
  @IsOptional()
  user_id: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi categoryga tegishli category idsi berilishi shart',
  })
  @IsNumberString()
  @IsOptional()
  category_id: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi ingredientlarni o\'z ichiga oladi ingredient idsi berilishi shart',
  })
  @IsNumberString()
  @IsOptional()
  ingredient_id: number

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi preparationlarni o\'z ichiga oladi preparation idsi berilishi shart',
  })
  @IsNumberString()
  @IsOptional()
  preparation_id: number
}
