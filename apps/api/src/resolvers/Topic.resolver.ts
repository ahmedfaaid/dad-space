import { ILike, getRepository } from 'typeorm';
import { Resolver, Query, Arg, FieldResolver, Root, Int } from 'type-graphql';
import { Topic } from '../entities/Topic.entity';
import { Post } from '../entities/Post.entity';

@Resolver(Topic)
export class TopicResolver {
  @FieldResolver(() => Int, { nullable: true })
  async postCount(@Root() topic: Topic): Promise<number> {
    const PostRepository = getRepository(Post);

    const count = await PostRepository.count({
      where: {
        topic: topic.id
      }
    });

    return count;
  }

  @Query(() => [Topic])
  async topics(
    @Arg('query', { nullable: true }) query: string
  ): Promise<Topic[]> {
    const topicRepository = getRepository(Topic);

    return await topicRepository.find(
      query
        ? {
            where: {
              name: ILike(`%${query}%`)
            }
          }
        : {}
    );
  }

  @Query(() => [Post], { nullable: true })
  async postsByTopic(@Arg('slug') slug: string): Promise<Post[]> {
    const TopicRepository = getRepository(Topic);
    const PostRepository = getRepository(Post);

    const topic = await TopicRepository.findOne({
      where: {
        slug
      }
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

    const posts = await PostRepository.find({
      where: {
        topic: topic.id
      },
      relations: [
        'topic',
        'postedBy',
        'comments',
        'comments.postedBy',
        'votes',
        'votes.user'
      ]
    });

    return posts;
  }
}
