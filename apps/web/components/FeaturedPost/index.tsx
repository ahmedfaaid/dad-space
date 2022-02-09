import NextLink from 'next/link';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  Spacer
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Post } from '../../types';

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Flex
      px={8}
      py={6}
      mb={4}
      mx='auto'
      w='80%'
      h='250px'
      justify='center'
      direction='column'
      position='relative'
      bg='white'
      color='#7B7B7B'
      boxShadow='md'
      borderRadius={4}
    >
      <Box textAlign='center' position='absolute' top={7}>
        <ChevronUpIcon
          w={6}
          h={6}
          _hover={{ color: 'star-command-blue' }}
          cursor='pointer'
        />
        <Text color='star-command-blue'>12K</Text>
        <ChevronDownIcon
          w={6}
          h={6}
          _hover={{ color: 'star-command-blue' }}
          cursor='pointer'
        />
      </Box>
      <Flex
        minW='70px'
        h='25px'
        position='absolute'
        top='10px'
        right='10px'
        justify='center'
        align='center'
        border='1px'
        borderColor='star-command-blue'
      >
        <Badge
          fontSize='sm'
          colorScheme='star-command-blue'
          color='star-command-blue'
        >
          {post.topic.name}
        </Badge>
      </Flex>
      <Flex direction='column' width='80%' height='90%' mx='auto'>
        <Box>
          <NextLink href={`/posts/${post.id}`}>
            <a>
              <Heading as='h2' size='sm' mb={2} color='black'>
                {post.headline}
              </Heading>
            </a>
          </NextLink>
          <Text fontSize='xs'>{post.text.substring(0, 500)}...</Text>
        </Box>
        <Spacer />
        <Divider my={4} />
        <Grid templateColumns='repeat(3, 1fr)'>
          <Flex align='center'>
            <Avatar size='xs' src='https://bit.ly/broken-link' w={5} h={5} />
            <Text ml={2} fontSize='xs'>
              Posted by{' '}
              <Link color='star-command-blue' fontSize='xs'>
                {post.postedBy.firstName} {post.postedBy.lastName}
              </Link>
            </Text>
          </Flex>
          <Text justifySelf='center' fontSize='xs'>
            {post.createdAt}
          </Text>
          <Flex align='center' justifySelf='end'>
            <ChatIcon w={3} h={3} mr={2} />
            <Text fontSize='xs'>
              {post.comments.length > 50 ? '50+' : post.comments.length}
            </Text>
          </Flex>
        </Grid>
      </Flex>
    </Flex>
  );
}
