import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    update(id: string, updateUserDto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<void>;
}
