import { Avatar, Box, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { BsReply } from 'react-icons/bs';
import { distanceInWordsToNow } from 'date-fns';
import { Comment as CommentType } from '../../types';

interface CommentProps {
  comment: CommentType;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <Box>
      <Flex align='center'>
        <Avatar src='https://bit.ly/broken-link' w={5} h={5} />
        <Text ml={2} fontSize='sm'>
          <Link color='star-command-blue' fontSize='sm'>
            {comment.postedBy.firstName} {comment.postedBy.lastName}
          </Link>
        </Text>
        <Text ml={2} fontSize='sm'>
          {distanceInWordsToNow(new Date(comment.createdAt))} ago
        </Text>
      </Flex>
      <Text ml={7} fontSize='sm'>
        {comment.text}
      </Text>
      <Flex align='center' ml={7} mt={2}>
        <Link>
          <Text fontSize='sm' fontWeight='semibold'>
            <Icon as={BsReply} w={4} h={3} /> Reply
          </Text>
        </Link>
        <Text fontSize='sm' fontWeight='semibold'>
          <Link ml={2}>Report</Link>
        </Text>
      </Flex>
    </Box>
  );
}
