import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, InputType, ID, Int } from 'type-graphql';
import { User } from './User.entity';
import { Topic } from './Topic.entity';
import { Comment } from './Comment.entity';
import { Error } from './Error.entity';

@Entity()
@ObjectType()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  headline: string;

  @Field()
  @Column()
  text: string;

  @Field(() => Topic)
  @ManyToOne(() => Topic, topic => topic.posts, { cascade: true })
  topic: Topic;

  @Field(() => User)
  @ManyToOne(() => User, user => user.posts, { cascade: true })
  @JoinColumn()
  postedBy: User;

  @Field(() => [Comment])
  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  @JoinColumn()
  comments: Comment[];

  @Field(() => Int)
  @Column({ default: 0 })
  upvotes: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class PostResponse {
  @Field(() => Post, { nullable: true })
  post?: Post;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

@ObjectType()
export class PostCommentsResponse {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}

@InputType()
export class PostInput {
  @Field()
  headline: string;

  @Field()
  text: string;

  @Field()
  topicID: string;
}
