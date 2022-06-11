import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Field()
  @Column()
  slug: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, user => user.moderates)
  @JoinTable()
  moderators?: User[];

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, post => post.topic)
  @JoinColumn({ name: 'id' })
  posts?: Post[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
