import { getRepository } from 'typeorm';
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';
import {
  Post,
  PostCommentsResponse,
  PostInput,
  PostResponse
} from '../entities/Post.entity';
import { User } from '../entities/User.entity';
import { Topic } from '../entities/Topic.entity';
import { Comment } from '../entities/Comment.entity';
import { isAuth } from '../middleware/isAuth';
import { Context } from '../types/Context';
import { Vote } from '../entities/Vote.entity';

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(@Root() post: Post, @Ctx() ctx: Context): Promise<number> {
    const voteRepository = getRepository(Vote);

    if (!ctx.req.session.userId) {
      return 0;
    }

    const vote = await voteRepository.findOne({
      where: {
        post: post.id,
        user: ctx.req.session.userId
      }
    });

    if (!vote) {
      return 0;
    }

    return vote.value;
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() post: Post): Promise<Comment[]> {
    const commentRepository = getRepository(Comment);

    return await commentRepository.find({
      where: {
        post
      },
      relations: [
        'postedBy',
        'parent',
        'parent.postedBy',
        'children',
        'children.postedBy'
      ],
      order: {
        createdAt: 'ASC'
      }
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId') postId: string,
    @Arg('value', () => Int) value: number,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    const voteRepository = getRepository(Vote);
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);

    const actualValue = value > 0 ? 1 : -1;

    const vote = await voteRepository.findOne({
      where: {
        post: postId,
        user: ctx.req.session.userId
      }
    });

    const post = await postRepository.findOne(postId);
    const voter = await userRepository.findOne(ctx.req.session.userId);

    if (vote && vote.value !== actualValue) {
      await voteRepository.update(vote.id, {
        value: actualValue
      });

      const v = 2 * actualValue;

      await postRepository.update(postId, {
        voteCount: post!.voteCount + v
      });
    } else if (!vote) {
      await voteRepository.save({
        value: actualValue,
        post,
        user: voter
      });

      await postRepository.update(postId, {
        voteCount: post!.voteCount + actualValue
      });
    }

    return true;
  }

  @Query(() => [Post])
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('skip', () => Int) skip: number
  ): Promise<Post[]> {
    const take = limit | 20;
    const postRepository = getRepository(Post);

    return await postRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['topic', 'postedBy', 'votes'],
      take,
      skip
    });
  }

  @Query(() => PostResponse)
  async post(@Arg('id') id: string): Promise<PostResponse> {
    const postRepository = getRepository(Post);

    try {
      const post = await postRepository.findOne(id, {
        relations: [
          'topic',
          'postedBy',
          'comments',
          'comments.postedBy',
          'votes',
          'votes.user'
        ]
      });

      if (!post) {
        return {
          errors: [
            {
              path: 'post',
              message: 'Post does not exist'
            }
          ]
        };
      }

      return { post };
    } catch (error) {
      return {
        errors: [
          {
            path: 'post',
            message: 'There was an error retrieving the post'
          }
        ]
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => PostResponse)
  async createPost(
    @Arg('post') post: PostInput,
    @Ctx() ctx: Context
  ): Promise<PostResponse> {
    const postRepository = getRepository(Post);
    const userRepository = getRepository(User);
    const topicRepository = getRepository(Topic);

    try {
      const postedBy = await userRepository.findOne(ctx.req.session.userId);
      const topic = await topicRepository.findOne(post.topicID);

      if (!postedBy) {
        return {
          errors: [
            {
              path: 'createPost',
              message: 'You must be logged in to create a post'
            }
          ]
        };
      }

      if (!topic) {
        return {
          errors: [
            {
              path: 'createPost',
              message: 'Topic does not exist'
            }
          ]
        };
      }

      const newPost = await postRepository.save({
        ...post,
        comments: [],
        postedBy,
        topic
      });

      const postToReturn = await postRepository.findOneOrFail(newPost.id, {
        relations: ['topic', 'postedBy', 'comments', 'comments.postedBy']
      });

      return {
        post: postToReturn
      };
    } catch (error) {
      return {
        errors: [
          {
            path: 'createPost',
            message: 'There was an error creating the post'
          }
        ]
      };
    }
  }

  // @Query(() => PostCommentsResponse)
  // async postComments(
  //   @Arg('postID') postID: string
  // ): Promise<PostCommentsResponse> {
  //   const postRepository = getRepository(Post);
  //   const commentRepository = getRepository(Comment);

  //   try {
  //     const post = await postRepository.findOne(postID);

  //     if (!post) {
  //       return {
  //         errors: [
  //           {
  //             path: 'postComments',
  //             message: 'Post does not exist'
  //           }
  //         ]
  //       };
  //     }

  //     const comments = await commentRepository.find({
  //       where: { post },
  //       relations: ['postedBy', 'post', 'parent', 'children']
  //     });

  //     return { comments };
  //   } catch (error) {
  //     return {
  //       errors: [
  //         {
  //           path: 'postComments',
  //           message: 'There was an error retrieving the comments'
  //         }
  //       ]
  //     };
  //   }
  // }
}
