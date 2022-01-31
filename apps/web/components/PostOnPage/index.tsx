import {
  Flex,
  Box,
  Heading,
  Spacer,
  Avatar,
  Link,
  Text
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, ChatIcon } from '@chakra-ui/icons';
import CommentForm from './CommentForm';

export default function PostOnPage({
  post,
  user,
  handleChange,
  handleSubmit,
  isSubmitting
}) {
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
        <Flex>
          <Flex>
            <ChevronUpIcon
              w={5}
              h={5}
              _hover={{ color: 'star-command-blue' }}
              cursor='pointer'
            />
            <Text color='star-command-blue'>12K</Text>
            <ChevronDownIcon
              w={5}
              h={5}
              _hover={{ color: 'star-command-blue' }}
              cursor='pointer'
            />
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
        </Flex>
      </Flex>
      <CommentForm
        user={user}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
