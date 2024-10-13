import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateRecipeRequest, IUpdateRecipeRequest } from '../interfaces';
import { RecipeRoles } from '../models';

export class UpdateRecipeDto implements Omit<IUpdateRecipeRequest, 'image' | 'video'> {
  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe",
    example: "Osh"
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: "Recipe haqida ma'lumot yozing",
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  cooking_time: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe porsiyasi",
  })
  @IsNotEmpty()
  @IsString()
  yield: string;

  @ApiProperty({
    type: String,
    required: true,
    description: "Recipe admin tomonidan tasdiqlangan yoki tasdiqlanmaganligi",
    example: RecipeRoles.not_confirmed
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi categoryga tegishli category idsi berilishi shart',
  })
  @IsNumberString()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi ingredientlarni o\'z ichiga oladi ingredient idsi berilishi shart',
  })
  @IsNumberString()
  @IsNotEmpty()
  ingredient_id: number

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
    description: 'Recipe qaysi preparationlarni o\'z ichiga oladi preparation idsi berilishi shart',
  })
  @IsNumberString()
  @IsNotEmpty()
  preparation_id: number
}