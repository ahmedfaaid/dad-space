import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User.entity';
import { Post } from './Post.entity';

@Entity()
@ObjectType()
export class Topic {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [User])
  @ManyToMany(() => User, user => user.moderates)
  @JoinTable()
  moderators: User[];

  @Field(() => [Post])
  @OneToMany(() => Post, post => post.topic)
  @JoinColumn({ name: 'id' })
  posts: Post[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;
}
