import { getRepository } from 'typeorm';
import {
  Arg,
  Ctx,
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
  async posts(): Promise<Post[]> {
    const postRepository = getRepository(Post);

    return await postRepository.find({
      relations: ['topic', 'postedBy', 'comments']
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
