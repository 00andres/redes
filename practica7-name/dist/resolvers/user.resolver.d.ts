import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    createUser(input: CreateUserDto): Promise<User>;
}
