import { getRepository } from 'typeorm';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import {
  Comment,
  CommentInput,
  CommentsResponse
} from '../entities/Comment.entity';
import { User } from '../entities/User.entity';
import { Post } from '../entities/Post.entity';
import { Context } from '../types/Context';
import { isAuth } from '../middleware/isAuth';

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

  @UseMiddleware(isAuth)
  @Mutation(() => CommentsResponse)
  async createComment(
    @Arg('comment') comment: CommentInput,
    @Ctx() ctx: Context
  ): Promise<CommentsResponse> {
    const commentRepository = getRepository(Comment);
    const userRepository = getRepository(User);
    const postRepository = getRepository(Post);

    let reply;

    try {
      if (comment.parentId) {
        reply = await commentRepository.findOne(comment.parentId);
      }

      const postedBy = await userRepository.findOne(ctx.req.session!.userId);
      const post = await postRepository.findOne(comment.postId);

      if (!postedBy) {
        return {
          errors: [
            {
              path: 'createComment',
              message: 'You must be logged in to comment'
            }
          ]
        };
      }

      if (!post) {
        return {
          errors: [
            {
              path: 'createComment',
              message: 'Post not found'
            }
          ]
        };
      }

      const newComment = await commentRepository.save({
        ...comment,
        postedBy,
        post,
        parent: reply
      });

      const createdComment = await commentRepository.findOneOrFail(
        newComment.id,
        {
          relations: ['postedBy', 'post', 'parent', 'children']
        }
      );

      return {
        comments: [createdComment]
      };
    } catch (error) {
      return {
        errors: [
          {
            path: 'createComment',
            message: 'There was an error creating the comment'
          }
        ]
      };
    }
  }
}
