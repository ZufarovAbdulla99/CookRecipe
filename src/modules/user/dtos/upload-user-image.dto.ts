import { ApiProperty } from '@nestjs/swagger';
import { UploadUserImageRequest } from '../interfaces';
import { IsNumberString, IsOptional } from 'class-validator';

export class UpdateUserImageDto
  implements Omit<UploadUserImageRequest, 'image'>
{
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumberString()
  userId: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  @IsOptional()
  image: any;
}
