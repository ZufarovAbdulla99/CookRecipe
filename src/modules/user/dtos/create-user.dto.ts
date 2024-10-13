import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateUserRequest } from '../interfaces';
import { UserRoles } from 'src/enum';

export class CreateUserDto implements Omit<ICreateUserRequest, 'image'> {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Diyor',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: "Jo'rayev",
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    type: String,
    required: true,
    uniqueItems: true,
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    uniqueItems: true,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 8)
  password: string;

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
