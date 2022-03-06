import { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Spacer,
  Avatar,
  Link,
  Text,
  Button,
  Divider,
  useToast
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Post, User } from '../../types';
import ConfirmDelete from '../ConfirmDelete';
import VoteSection from '../VoteSection';

interface FeaturedPostProps {
  post: Post;
  user: User;
  postId: string;
}

export default function PostOnPage({ post, user, postId }: FeaturedPostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const [postToDelete, setPostToDelete] = useState();

  return (
    <>
      <Flex direction='column' minH='200px'>
        <Box mb={4}>
          <Heading as='h2' size='lg' color='black'>
            {post.headline}
          </Heading>
        </Box>
        <Box mb={4}>
          <Text fontSize='md'>{post.text}</Text>
        </Box>
        <Spacer />
        <Flex align='center'>
          <Flex align='center'>
            <VoteSection post={post} />
          </Flex>
          <Flex ml={4} align='center' justifySelf='end'>
            <ChatIcon w={3} h={3} mr={2} />
            <Text fontSize='sm'>{post.comments.length} comments</Text>
          </Flex>
          <Flex ml={4} align='center'>
            <Avatar size='sm' src='https://bit.ly/broken-link' w={5} h={5} />
            <Text ml={2} fontSize='sm'>
              Posted by{' '}
              <Link color='star-command-blue' fontSize='sm'>
                {post.postedBy.firstName} {post.postedBy.lastName}
              </Link>
            </Text>
          </Flex>
          {post.postedBy.id === user.id && (
            <>
              <Spacer />
              <Button
                colorScheme='red'
                variant='link'
                size='sm'
                onClick={() => setIsOpen(true)}
              >
                Delete
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <CommentForm user={user} postId={postId} />
      <Box mt={8}>
        <Divider mb={4} />
        {post.comments.length === 0 ? (
          <Text>There are no comments. Be the first to comment.</Text>
        ) : (
          post.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              user={user}
              postId={postId}
              toast={toast}
            />
          ))
        )}
      </Box>
      <ConfirmDelete
        item='post'
        isOpen={isOpen}
        onClose={onClose}
        itemToDelete={postToDelete}
        setItemToDelete={setPostToDelete}
        toast={toast}
      />
    </>
  );
}
