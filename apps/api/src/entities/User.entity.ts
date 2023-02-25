import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Comment } from './Comment.entity';
import { Error } from './Error.entity';
import { Post } from './Post.entity';
import { Topic } from './Topic.entity';
import { Vote } from './Vote.entity';

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
  @Column({ unique: true })
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

  @Field(() => [Vote], { nullable: true })
  @OneToMany(() => Vote, vote => vote.user)
  votes: Vote[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
export class UserResponse {
  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
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
