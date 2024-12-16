import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(registerDto: RegisterDto): Promise<{
        token: string;
        user: User;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}
