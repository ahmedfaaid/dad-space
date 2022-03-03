import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react';
import { usePostQuery } from 'dad-gql';
import Layout from '../../components/layout';
import { AuthContext } from '../../context/auth';
import PostOnPage from '../../components/PostOnPage';
import PostSkeleton from '../../components/PostOnPage/PostSkeleton';

export default function Post() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { id } = router.query;
  const [{ data, fetching }] = usePostQuery({
    variables: { id: id as string }
  });

  return (
    <Layout>
      <Box
        px={8}
        py={6}
        mt={4}
        mx='auto'
        w='80%'
        position='relative'
        bg='white'
        color='#7B7B7B'
        boxShadow='md'
        borderRadius={4}
      >
        {fetching ? (
          <PostSkeleton />
        ) : !data ? (
          <Text>No post found</Text>
        ) : (
          <PostOnPage post={data.post.post} user={user} postId={id as string} />
        )}
      </Box>
    </Layout>
  );
}
