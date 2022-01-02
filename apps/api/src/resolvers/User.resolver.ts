import { getRepository } from 'typeorm';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserInput } from '../entities/User.entity';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const userRepository = getRepository(User);

    return await userRepository.find({
      relations: ['posts', 'comments', 'moderates']
    });
  }

  @Query(() => User)
  async user(id: string): Promise<User> {
    const userRepository = getRepository(User);

    return await userRepository.findOneOrFail(id);
  }
}
