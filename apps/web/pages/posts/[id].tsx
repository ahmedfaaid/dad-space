import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Skeleton, Text } from '@chakra-ui/react';
import { usePostQuery, usePostCommentsQuery } from 'dad-gql';
import { useFormik } from 'formik';
import Layout from '../../components/layout';
import { AuthContext } from '../../context/auth';
import PostOnPage from '../../components/PostOnPage';
import PostSkeleton from '../../components/PostOnPage/PostSkeleton';
import Comment from '../../components/PostOnPage/Comment';

export default function Post() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { id } = router.query;
  const [{ data, fetching }] = usePostQuery({
    variables: { id: id as string }
  });
  const [{ data: commentData, fetching: commentFetching }] =
    usePostCommentsQuery({
      variables: { postId: id as string }
    });

  const { handleSubmit, handleChange, isSubmitting } = useFormik({
    initialValues: {
      text: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
    }
  });

  const commentSkeleton = <Skeleton />;

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
          <PostOnPage
            post={data.post.post}
            user={user}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isSubmitting={isSubmitting}
          />
        )}
        <Box mt={8}>
          <Divider mb={4} />
          {commentFetching ? (
            commentSkeleton
          ) : commentData.postComments.comments.length === 0 ? (
            <Text>There are no comments. Be the first to comment.</Text>
          ) : (
            commentData.postComments.comments.map(comment => (
              <Comment key={comment.id} comment={comment} user={user} />
            ))
          )}
        </Box>
      </Box>
    </Layout>
  );
}
