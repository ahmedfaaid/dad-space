import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';
import { useTopicsQuery } from 'dad-gql';
import { Topic } from '../../types';
import { shortenNumber } from '../../utils/fns';

interface TopItemProps {
  topic?: Topic;
}

export default function TopTopics() {
  const [{ data, fetching }] = useTopicsQuery({
    variables: {
      top: true
    }
  });

  return (
    <Box mt={8} p={2} w='100%' bg='white' boxShadow='md' borderRadius={4}>
      <Heading as='h3' fontSize='12px' color='#7B7B7B'>
        Top topics and posts
      </Heading>
      <VStack spacing={4}>
        {fetching ? (
          <Spinner />
        ) : (
          data?.topics.map(topic => <TopItem key={topic.id} topic={topic} />)
        )}
      </VStack>
    </Box>
  );
}

function TopItem({ topic }: TopItemProps) {
  return (
    <Link href={`/topics/${topic?.slug}`} passHref>
      <Flex
        align='center'
        w='100%'
        mt={4}
        cursor='pointer'
        _hover={{
          bg: '#F1F1F1'
        }}
      >
        <Text size='sm' color='star-command-blue'>
          {topic.name}
        </Text>
        <Spacer />
        <Text fontSize='12px' fontWeight='semibold' color='#7B7B7B' mr={2}>
          {shortenNumber(topic.postCount)}
        </Text>
        <ChevronUpIcon w={4} h={4} color='star-command-blue' />
      </Flex>
    </Link>
  );
}
