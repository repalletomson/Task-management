import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByUsername(username: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    findUsers(): Promise<User[]>;
}
