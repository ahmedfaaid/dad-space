import { getRepository } from 'typeorm';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import * as argon2 from 'argon2';
import { User, UserInput } from '../entities/User.entity';
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

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return null;
    }

    ctx.req.session.userId = user.id;

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async signup(
    @Arg('user') user: UserInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userRepository = getRepository(User);

    const existingUser = await userRepository.findOne({
      where: { email: user.email }
    });

    if (existingUser) {
      return null;
    }

    const hashedPassword = await argon2.hash(user.password);

    const newUser = await userRepository.save({
      ...user,
      password: hashedPassword,
      posts: [],
      comments: [],
      moderates: []
    });

    ctx.req.session.userId = newUser.id;

    return newUser;
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
