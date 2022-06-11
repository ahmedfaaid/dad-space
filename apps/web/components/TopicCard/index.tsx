import NextLink from 'next/link';
import {
  Box,
  useColorModeValue,
  Stack,
  Text,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { Topic } from '../../types';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  return (
    <NextLink href={`/topics/${topic.name}`}>
      <Flex
        as='a'
        bg='white'
        align='center'
        p={4}
        _hover={{ cursor: 'pointer', color: 'star-command-blue' }}
        fontSize='xl'
        color='gray.600'
      >
        <Text mx={4}>{index + 1}</Text>
        <Text>{topic.name}</Text>
        <Spacer />
        <Text fontSize='12px' fontWeight='semibold' mr={2}>
          5.1k
        </Text>
      </Flex>
    </NextLink>
  );
}
