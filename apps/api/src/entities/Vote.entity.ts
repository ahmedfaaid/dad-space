import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { User } from './User.entity';
import { Post } from './Post.entity';

@Entity()
@ObjectType()
export class Vote {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  value: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.votes, { cascade: true })
  @JoinColumn()
  user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.votes, { cascade: true })
  @JoinColumn()
  post: Post;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
