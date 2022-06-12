import {
  Grid,
  GridItem,
  Skeleton,
  Text,
  Box,
  Flex,
  VStack,
  StackDivider,
  Heading
} from '@chakra-ui/react';
import { useTopicsQuery } from 'dad-gql';
import AdditionalLinks from '../../components/AdditionalLinks';
import Layout from '../../components/layout';
import SideMenu from '../../components/SideMenu';
import TopicCard from '../../components/TopicCard';
import TopTopics from '../../components/TopTopics';

export default function Topics() {
  const [{ data, fetching }] = useTopicsQuery();

  return (
    <Layout>
      {fetching ? (
        <Skeleton />
      ) : !data ? (
        <Text>No topics found</Text>
      ) : (
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={1}
          align='stretch'
        >
          <Box p={2} bg='powder-blue'>
            <Heading size='md' ml={2} fontWeight='semibold'>
              All Topics
            </Heading>
          </Box>
          {data.topics.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} index={i} />
          ))}
        </VStack>
      )}
    </Layout>
  );
}
