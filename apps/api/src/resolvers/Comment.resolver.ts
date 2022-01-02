import { getRepository } from 'typeorm';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Comment, CommentInput } from '../entities/Comment.entity';
import { User } from '../entities/User.entity';
import { Post } from '../entities/Post.entity';

@Resolver()
export class CommentResolver {
  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    const commentRepository = getRepository(Comment);

    return await commentRepository.find({
      relations: ['postedBy', 'post', 'parent', 'children']
    });
  }

  @Query(() => Comment)
  async comment(@Arg('id') id: string): Promise<Comment> {
    const commentRepository = getRepository(Comment);

    return await commentRepository.findOneOrFail(id, {
      relations: ['postedBy', 'post', 'parent', 'children']
    });
  }

  @Mutation(() => Comment)
  async createComment(@Arg('comment') comment: CommentInput): Promise<Comment> {
    const commentRepository = getRepository(Comment);
    const userRepository = getRepository(User);
    const postRepository = getRepository(Post);

    let reply;

    if (comment.parentId) {
      reply = await commentRepository.findOneOrFail(comment.parentId);
    }

    const postedBy = await userRepository.findOneOrFail(comment.postedById);
    const post = await postRepository.findOneOrFail(comment.postId);

    const newComment = await commentRepository.save({
      ...comment,
      postedBy,
      post,
      parent: reply
    });

    return await commentRepository.findOneOrFail(newComment.id, {
      relations: ['postedBy', 'post', 'parent', 'children']
    });
  }
}
