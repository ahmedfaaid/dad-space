import { getRepository } from 'typeorm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import * as argon2 from 'argon2';
import { User, UserInput, UserResponse } from '../entities/User.entity';
import { Context } from '../types/Context';

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (!ctx.req.session.userId) {
      return null;
    }

    const userRepository = getRepository(User);

    return await userRepository.findOneOrFail(ctx.req.session.userId, {
      relations: ['posts', 'comments', 'moderates']
    });
  }

  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const valid = await argon2.verify(user.password, password);

      if (!valid) {
        throw new Error('Invalid email or password');
      }

      ctx.req.session.userId = user.id;

      return { user };
    } catch (err: any) {
      return {
        errors: [{ path: 'login', message: err.message }]
      };
    }
  }

  @Mutation(() => UserResponse, { nullable: true })
  async signup(
    @Arg('user') user: UserInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const userRepository = getRepository(User);

    const hashedPassword = await argon2.hash(user.password);

    try {
      const newUser = await userRepository.save({
        ...user,
        password: hashedPassword,
        posts: [],
        comments: [],
        moderates: []
      });

      ctx.req.session.userId = newUser.id;

      return { user: newUser };
    } catch (err: any) {
      return {
        errors: [{ path: 'signup', message: 'Email already in use' }]
      };
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      ctx.req.session.destroy(err => {
        if (err) {
          console.error(err);
          return reject(false);
        }

        ctx.res.clearCookie('dad-space-qid');
        return resolve(true);
      })
    );
  }
}
