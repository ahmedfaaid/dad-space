import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { usePostsQuery } from 'dad-gql';
import FeaturedPost from '../FeaturedPost';

export default function FeaturedPosts() {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 20,
      skip: 0
    }
  });

  return (
    <>
      {fetching ? (
        <Flex align='center' justify='center'>
          <Spinner />
        </Flex>
      ) : (
        <Box>
          {data.posts.length > 0 ? (
            data.posts.map(post => <FeaturedPost key={post.id} post={post} />)
          ) : (
            <Text textColor='#7B7B7B'>
              There are no featured posts. Create a post.
            </Text>
          )}
        </Box>
      )}
    </>
  );
}
