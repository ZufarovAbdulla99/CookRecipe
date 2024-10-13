import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserRequest, IUpdateUserRequest } from '../interfaces';
import { UserRoles } from 'src/enum';

export class UpdateUserDto implements Omit<IUpdateUserRequest, 'image'> {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Diyor',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: "Jo'rayev",
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    type: String,
    required: false,
    uniqueItems: true,
    example: 'john_doe',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    type: String,
    required: false,
    uniqueItems: true,
    example: 'john.doe@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '12345678',
  })
  @IsOptional()
  @IsString()
  @Length(8, 8)
  password?: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: any;

  @ApiProperty({
    enum: UserRoles,
    name: 'Role',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRoles)
  role?: UserRoles;
}
