import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Skeleton,
  Spacer,
  Text,
  Textarea
} from '@chakra-ui/react';
import { ChatIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { usePostQuery } from 'dad-gql';
import { useFormik } from 'formik';
import Layout from '../../components/layout';
import { AuthContext } from '../../context/auth';

export default function Post() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { id } = router.query;
  const [{ data, fetching }] = usePostQuery({
    variables: { id: id as string }
  });

  const {
    post: {
      post: { id: postId, headline, text, topic, postedBy, comments, createdAt }
    }
  } = data;

  const { handleSubmit, handleChange, isSubmitting } = useFormik({
    initialValues: {
      text: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
    }
  });

  const skeleton = (
    <Skeleton>
      <Box h='200px'>
        <Box mb={2}>
          <Heading as='h2' size='lg' color='black'>
            Post heading
          </Heading>
        </Box>
        <Box mb={4}>
          <Text fontSize='md'>Post text</Text>
        </Box>
        <Flex>
          <Flex>
            <ChevronUpIcon
              w={5}
              h={5}
              _hover={{ color: 'star-command-blue' }}
              cursor='pointer'
            />
            <Text color='star-command-blue'>12K</Text>
            <ChevronDownIcon
              w={5}
              h={5}
              _hover={{ color: 'star-command-blue' }}
              cursor='pointer'
            />
          </Flex>
          <Flex ml={4} align='center' justifySelf='end'>
            <ChatIcon w={3} h={3} mr={2} />
            <Text fontSize='sm'>Comments</Text>
          </Flex>
          <Flex ml={4} align='center'>
            <Avatar size='sm' src='https://bit.ly/broken-link' w={5} h={5} />
            <Text ml={2} fontSize='sm'>
              Posted by{' '}
              <Link color='star-command-blue' fontSize='sm'>
                John Doe
              </Link>
            </Text>
          </Flex>
        </Flex>
        <Divider mt={4} />
      </Box>
      <Box mt={8}>
        <Text>Commenter&apos;s name</Text>
        <form>
          <Flex direction='column'>
            <Textarea placeholder='What do you think?' />
            <Button size='lg'>Submit</Button>
          </Flex>
        </form>
      </Box>
    </Skeleton>
  );

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
          skeleton
        ) : !data ? (
          <Text>No post found</Text>
        ) : (
          <>
            <Flex direction='column' minH='200px'>
              <Box mb={4}>
                <Heading as='h2' size='lg' color='black'>
                  {headline}
                </Heading>
              </Box>
              <Box mb={4}>
                <Text fontSize='md'>{text}</Text>
              </Box>
              <Spacer />
              <Flex>
                <Flex>
                  <ChevronUpIcon
                    w={5}
                    h={5}
                    _hover={{ color: 'star-command-blue' }}
                    cursor='pointer'
                  />
                  <Text color='star-command-blue'>12K</Text>
                  <ChevronDownIcon
                    w={5}
                    h={5}
                    _hover={{ color: 'star-command-blue' }}
                    cursor='pointer'
                  />
                </Flex>
                <Flex ml={4} align='center' justifySelf='end'>
                  <ChatIcon w={3} h={3} mr={2} />
                  <Text fontSize='sm'>{comments.length} comments</Text>
                </Flex>
                <Flex ml={4} align='center'>
                  <Avatar
                    size='sm'
                    src='https://bit.ly/broken-link'
                    w={5}
                    h={5}
                  />
                  <Text ml={2} fontSize='sm'>
                    Posted by{' '}
                    <Link color='star-command-blue' fontSize='sm'>
                      {postedBy.firstName} {postedBy.lastName}
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Box mt={8}>
              <Text mb={2} fontSize='sm'>
                Comment as{' '}
                <Link color='star-command-blue' fontSize='sm'>
                  {user.firstName} {user.lastName}
                </Link>
              </Text>
              <form onSubmit={handleSubmit}>
                <Flex direction='column'>
                  <Textarea
                    onChange={handleChange}
                    placeholder='What do you think?'
                  />
                  <Button
                    mt={4}
                    loadingText='Submitting'
                    size='lg'
                    bg='star-command-blue'
                    color='white'
                    _hover={{
                      bg: 'blue.500'
                    }}
                    alignSelf='end'
                    isLoading={isSubmitting}
                    type='submit'
                  >
                    Submit
                  </Button>
                </Flex>
              </form>
            </Box>
            <Box mt={8}>
              <Divider mb={4} />
              {comments.length === 0 ? (
                <Text>There are no comments. Be the first to comment.</Text>
              ) : (
                comments.map(comment => (
                  <Box key={comment.id}>
                    <Text>{comment.text}</Text>
                  </Box>
                ))
              )}
            </Box>
          </>
        )}
      </Box>
    </Layout>
  );
}
