import { getRepository } from 'typeorm';
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { Post, PostInput } from '../entities/Post.entity';
import { User } from '../entities/User.entity';
import { Topic } from '../entities/Topic.entity';
import { isAuth } from '../middleware/isAuth';
import { Context } from '../types/Context';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('skip', () => Int) skip: number
  ): Promise<Post[]> {
    const take = limit | 20;
    const postRepository = getRepository(Post);

    return await postRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['topic', 'postedBy', 'comments'],
      take,
      skip
    });
  }

  @Query(() => Post)
  async post(@Arg('id') id: string): Promise<Post> {
    const postRepository = getRepository(Post);

    return await postRepository.findOneOrFail(id, {
      relations: ['topic', 'postedBy', 'comments']
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async createPost(
    @Arg('post') post: PostInput,
    @Ctx() ctx: Context
  ): Promise<Post> {
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);
    const topicRepository = getRepository(Topic);

    const postedBy = await userRepository.findOneOrFail(ctx.req.session.userId);
    const topic = await topicRepository.findOneOrFail(post.topicID);

    const newPost = await postRepository.save({
      ...post,
      comments: [],
      postedBy,
      topic
    });

    return await postRepository.findOneOrFail(newPost.id, {
      relations: ['topic', 'postedBy', 'comments']
    });
  }
}
