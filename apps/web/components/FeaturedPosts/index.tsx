import { Box, Flex, Spinner } from '@chakra-ui/react';
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
          {data?.posts.map(post => (
            <FeaturedPost key={post.id} post={post} />
          ))}
        </Box>
      )}
    </>
  );
}
