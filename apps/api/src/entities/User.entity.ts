import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { ObjectType, Field, InputType, ID } from 'type-graphql';
import { Post } from './Post.entity';
import { Comment } from './Comment.entity';
import { Topic } from './Topic.entity';

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field(() => [Post])
  @OneToMany(() => Post, post => post.postedBy)
  posts: Post[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.postedBy)
  comments: Comment[];

  @Field(() => [Topic])
  @ManyToMany(() => Topic, topic => topic.moderators)
  moderates: Post[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;
}

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
