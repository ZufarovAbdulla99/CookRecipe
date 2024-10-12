import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreatePreparationRequest } from '../interfaces';

export class CreatePreparationDto implements ICreatePreparationRequest
{
  @ApiProperty({
    type: String,
    required: true,
    example: "Taom tayyorlash bosqichlarini yozing",
  })
  @IsNotEmpty()
  @IsString()
  steps: string;
}