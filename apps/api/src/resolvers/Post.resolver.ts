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

  @Query(() => PostResponse)
  async post(@Arg('id') id: string): Promise<PostResponse> {
    const postRepository = getRepository(Post);

    try {
      const post = await postRepository.findOne(id, {
        relations: ['topic', 'postedBy', 'comments', 'comments.postedBy']
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

      console.log(post);

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

  @Query(() => PostCommentsResponse)
  async postComments(
    @Arg('postID') postID: string
  ): Promise<PostCommentsResponse> {
    const postRepository = getRepository(Post);
    const commentRepository = getRepository(Comment);

    try {
      const post = await postRepository.findOne(postID);

      if (!post) {
        return {
          errors: [
            {
              path: 'postComments',
              message: 'Post does not exist'
            }
          ]
        };
      }

      const comments = await commentRepository.find({
        where: { post },
        relations: ['postedBy', 'post', 'parent', 'children']
      });

      return { comments };
    } catch (error) {
      return {
        errors: [
          {
            path: 'postComments',
            message: 'There was an error retrieving the comments'
          }
        ]
      };
    }
  }
}
