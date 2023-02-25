import * as argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User, UserInput, UserResponse } from '../entities/User.entity';
import { Context } from '../types/Context';
import { email as sendEmail } from '../utils/email';

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

      return { users: [user] };
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

      return { users: [newUser] };
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

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const resetToken = uuidv4();

    await ctx.redis.set(
      `forgot-password:${resetToken}`,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 7
    ); // Expires in 7 days

    await sendEmail(
      email,
      'Reset your password',
      `<a href="http://localhost:3000/reset-password/${resetToken}">Reset your password</a>`
    );

    return true;
  }

  @Mutation(() => UserResponse)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const userRepository = getRepository(User);

    try {
      const userId = await ctx.redis.get(`forgot-password:${token}`);

      if (!userId) {
        return {
          errors: [
            {
              path: 'resetPassword',
              message: 'Invalid token'
            }
          ]
        };
      }

      const user = await userRepository.findOneOrFail(userId);

      if (!user) {
        return {
          errors: [
            {
              path: 'resetPassword',
              message: 'User not found'
            }
          ]
        };
      }

      const hashedPassword = await argon2.hash(newPassword);

      // Update the user's password
      const updatedUser = await userRepository.save({
        ...user,
        password: hashedPassword
      });

      await ctx.redis.del(`forgot-password:${token}`);

      ctx.req.session.userId = updatedUser.id;

      return { users: [updatedUser] };
    } catch (error) {
      return {
        errors: [
          {
            path: 'resetPassword',
            message: 'Invalid token'
          }
        ]
      };
    }
  }
}
