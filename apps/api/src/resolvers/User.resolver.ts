import { Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { User, UserResponse } from '../entities/User.entity';

@Resolver()
export class UserResolver {
  @Query(() => UserResponse)
  async users(): Promise<UserResponse> {
    const userRepository = getRepository(User);

    try {
      const users = await userRepository.find({
        relations: ['posts', 'comments', 'moderates']
      });

      return { users };
    } catch (error: any) {
      return {
        errors: [
          {
            path: 'users',
            message: error.message
          }
        ]
      };
    }
  }

  @Query(() => UserResponse)
  async user(id: string): Promise<UserResponse> {
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail(id);

      return { users: [user] };
    } catch (error: any) {
      return {
        errors: [
          {
            path: 'user',
            message: error.message
          }
        ]
      };
    }
  }
}
