import { ApiProperty } from "@nestjs/swagger";
import { ISignUpRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto implements ISignUpRequest {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}