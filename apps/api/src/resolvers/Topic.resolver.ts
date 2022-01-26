import { ILike, getRepository } from 'typeorm';
import { Resolver, Query, Arg } from 'type-graphql';
import { Topic } from '../entities/Topic.entity';

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
}
