import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdateCategoryRequest } from '../interfaces';

export class UpdateCategoryDto
  implements Omit<IUpdateCategoryRequest, 'image'>
{
  @ApiProperty({
    type: String,
    required: true,
    example: "Taom turi misol uchun Pizza yoki sho'rva",
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: any;
}
