import Link from 'next/link';
import { Box, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';

interface TopItemProps {
  topic: string;
  ups: number;
}

function TopItem({ topic, ups }: TopItemProps) {
  return (
    <Link href={`/topics/${topic.toLowerCase()}`} passHref>
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
          {topic}
        </Text>
        <Spacer />
        <Text fontSize='12px' fontWeight='semibold' color='#7B7B7B' mr={2}>
          {ups}k
        </Text>
        <ChevronUpIcon w={4} h={4} color='star-command-blue' />
      </Flex>
    </Link>
  );
}

export default function TopTopics() {
  return (
    <Box mt={8} p={2} w='100%' bg='white' boxShadow='md' borderRadius={4}>
      <Heading as='h3' fontSize='12px' color='#7B7B7B'>
        Top topics and posts
      </Heading>
      <VStack spacing={4}>
        <TopItem topic='Anxiety' ups={12.1} />
        <TopItem topic='Discipline' ups={8.5} />
        <TopItem topic='Time' ups={8.0} />
        <TopItem topic='Love' ups={5.1} />
      </VStack>
    </Box>
  );
}
