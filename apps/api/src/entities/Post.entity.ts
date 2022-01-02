import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, InputType, ID } from 'type-graphql';
import { User } from './User.entity';
import { Topic } from './Topic.entity';
import { Comment } from './Comment.entity';

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

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;
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
