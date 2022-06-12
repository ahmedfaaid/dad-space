import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex, Link, Spinner } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { usePostsByTopicQuery } from 'dad-gql';
import Layout from '../../components/layout';
import FeaturedPost from '../../components/FeaturedPost';

export default function SingleTopic() {
  const router = useRouter();
  const { slug } = router.query;
  const [{ data, fetching }] = usePostsByTopicQuery({
    variables: {
      slug: slug as string
    }
  });

  return (
    <Layout>
      <Box w='80%' mx='auto' mb={8}>
        <Link onClick={() => router.back()} color='star-command-blue'>
          <ArrowBackIcon /> Back
        </Link>
      </Box>
      {fetching ? (
        <Flex align='center' justify='center'>
          <Spinner />
        </Flex>
      ) : (
        <Box>
          {data?.postsByTopic.map(post => (
            <FeaturedPost key={post.id} post={post} />
          ))}
        </Box>
      )}
    </Layout>
  );
}
