import { useState } from 'react';
import {
  Box,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Skeleton,
  Stack,
  Text
} from '@chakra-ui/react';
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons';
import { useTopicsQuery } from 'dad-gql';
import { Topic } from '../../types';

interface TopicSelectProps {
  setTopic: (topic: Topic | null) => void;
}

export default function TopicsSelect({ setTopic }: TopicSelectProps) {
  const [query, setQuery] = useState('');
  const [{ data, fetching }] = useTopicsQuery({
    variables: { query }
  });

  let results;

  if (data?.topics.length === 0) {
    results = (
      <Box>
        <Text>No topics found</Text>
      </Box>
    );
  }

  if (fetching) {
    results = (
      <Skeleton>
        <Flex p={2} borderRadius={2} align='center' cursor='pointer'>
          <ChevronRightIcon w={6} h={6} />
          <Text fontSize='lg'>Topic name</Text>
        </Flex>
      </Skeleton>
    );
  }

  if (data) {
    results = data.topics.map(topic => (
      <Flex
        key={topic.id}
        p={2}
        borderRadius={2}
        align='center'
        cursor='pointer'
        bg='star-command-blue'
        color='white'
        _hover={{ bg: 'navy-blue' }}
        onClick={() => setTopic(topic)}
      >
        <ChevronRightIcon w={6} h={6} />
        <Text fontSize='lg'>{topic.name}</Text>
      </Flex>
    ));
  }

  return (
    <Flex
      width='30%'
      mx='auto'
      mt={8}
      align='center'
      justify='center'
      direction='column'
    >
      <InputGroup variant='outline'>
        <Input
          placeholder='Search a topic to post to'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            icon={<SearchIcon />}
            aria-label='Search'
            variant='outline'
            _hover={{ bg: 'star-command-blue', color: 'white' }}
          />
        </InputRightElement>
      </InputGroup>
      <Stack direction='column' mt={8} w='100%' spacing={4}>
        {results}
      </Stack>
    </Flex>
  );
}
