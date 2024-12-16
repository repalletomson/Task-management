import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
    IsArray,
  } from 'class-validator';
import { Role } from '../../users/role.enum';
import { Prop } from '@nestjs/mongoose';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;
 
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "password must be at least 6 characters long" })
    password: string;
  
  @IsOptional()
  role: string;

  }