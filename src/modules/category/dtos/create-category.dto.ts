import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateCategoryRequest } from '../interfaces';

export class CreateCategoryDto
  implements Omit<ICreateCategoryRequest, 'image'>
{
  @ApiProperty({
    type: String,
    required: true,
    example: "Taom turi misol uchun Pizza yoki sho'rva",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  @IsOptional()
  image?: any;
}
