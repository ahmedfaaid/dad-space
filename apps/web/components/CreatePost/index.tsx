import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCreatePostMutation } from 'dad-gql';
import { createPostSchema } from '../../utils/formValidation';

export default function CreatePost({ topic }) {
  const [_, createPost] = useCreatePostMutation();
  const toast = useToast();
  const router = useRouter();

  const { handleSubmit, handleChange, values, isSubmitting } = useFormik({
    initialValues: {
      headline: '',
      text: ''
    },
    validationSchema: createPostSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const res = await createPost({
        post: {
          headline: values.headline,
          text: values.text,
          topicID: topic.id
        }
      });

      if (res.data?.createPost.errors) {
        toast({
          title: 'Error creating post',
          description: `There was an error creating the post: ${res.data.createPost.errors}`,
          status: 'error',
          duration: 9000,
          isClosable: true
        });
      } else if (res.data?.createPost.post) {
        toast({
          title: 'Post created',
          description: 'You have successfully created a post!',
          status: 'success',
          duration: 9000,
          isClosable: true
        });
        router.push(`/posts/${res.data.createPost.post.id}`);
        setSubmitting(false);
      }
    }
  });

  return (
    <Flex w='50%' mx='auto' mt={4} align='center' justify='center'>
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl' textAlign='center'>
            Create a new post
          </Heading>
          <Text fontSize='lg' color='gray.600'>
            Posting to:{' '}
            <Text color='navy-blue' d='inline'>
              {topic.name}
            </Text>
          </Text>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                id='headline'
                placeholder='Enter a headline'
                value={values.headline}
                onChange={handleChange}
              />
              <Textarea
                id='text'
                value={values.text}
                placeholder='What do you want to say?'
                onChange={handleChange}
              />
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  bg='star-command-blue'
                  color='white'
                  _hover={{
                    bg: 'blue.500'
                  }}
                  isLoading={isSubmitting}
                  type='submit'
                >
                  Post
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
