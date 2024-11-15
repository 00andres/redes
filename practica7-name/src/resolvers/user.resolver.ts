import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../entity/user.entity'; // Importa correctamente la clase User
import { CreateUserDto } from '../dto/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto) {
    return this.userService.create(input);
  }
}
