import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, InputType, ID } from 'type-graphql';
import { User } from './User.entity';
import { Post } from './Post.entity';
import { Error } from './Error.entity';

@Entity()
@ObjectType()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  text: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments)
  @JoinColumn()
  postedBy: User;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.comments)
  post: Post;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, comment => comment.children)
  @JoinColumn()
  parent?: Comment;

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.parent, { cascade: true })
  children: Comment[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class CommentsResponse {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

@InputType()
export class CommentInput {
  @Field()
  text: string;

  @Field()
  postId: string;

  @Field({ nullable: true })
  parentId?: string;
}
