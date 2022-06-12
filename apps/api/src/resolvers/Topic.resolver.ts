import { ILike, getRepository } from 'typeorm';
import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Topic } from '../entities/Topic.entity';
import { Post } from '../entities/Post.entity';

@Resolver()
export class TopicResolver {
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
