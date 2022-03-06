import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Flex,
  Textarea,
  Button,
  Text,
  Link,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCreateCommentMutation } from 'dad-gql';
import { User } from '../../types';

interface CommentFormProps {
  user: User;
  parentId?: string;
  parentCreator?: User;
  postId: string;
  setShowReplyForm?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentForm({
  user,
  parentId,
  parentCreator,
  postId,
  setShowReplyForm
}: CommentFormProps) {
  const [_, createComment] = useCreateCommentMutation();
  const toast = useToast();
  const { handleSubmit, handleChange, isSubmitting, values, resetForm } =
    useFormik({
      initialValues: {
        text: ''
      },
      onSubmit: async (values, { setSubmitting }) => {
        const res = await createComment({
          comment: {
            ...values,
            postId,
            parentId
          }
        });

        if (res.data.createComment.errors) {
          toast({
            title: 'Error creating comment',
            description: `There was an error creating the comment: ${res.data.createComment.errors[0].message}`,
            status: 'error',
            duration: 9000,
            isClosable: true
          });
        } else if (res.data.createComment.comments) {
          resetForm();
          toast({
            title: 'Comment created',
            description: 'You have successfully created a comment!',
            status: 'success',
            duration: 9000,
            isClosable: true
          });
          if (parentId && setShowReplyForm) {
            setShowReplyForm(false);
          }
        }

        setSubmitting(false);
      }
    });

  return (
    <Box mt={8} ml={parentId && 7}>
      {parentId ? (
        <Text mb={2} fontSize='sm'>
          Reply to{' '}
          <Link color='star-command-blue' fontSize='sm'>
            {parentCreator.firstName} {parentCreator.lastName}
          </Link>
        </Text>
      ) : (
        <Text mb={2} fontSize='sm'>
          Comment as{' '}
          <Link color='star-command-blue' fontSize='sm'>
            {user.firstName} {user.lastName}
          </Link>
        </Text>
      )}
      <form onSubmit={handleSubmit}>
        <Flex direction='column'>
          <Textarea
            id='text'
            onChange={handleChange}
            placeholder='What do you think?'
            value={values.text}
          />
          <Flex mt={4} justify='end'>
            <Button
              mr={4}
              size={parentId ? 'xs' : 'sm'}
              colorScheme='red'
              disabled={values.text.length === 0 || isSubmitting}
              onClick={
                parentId ? () => setShowReplyForm(false) : () => resetForm()
              }
            >
              Cancel
            </Button>
            <Button
              loadingText='Submitting'
              size={parentId ? 'xs' : 'sm'}
              bg='star-command-blue'
              color='white'
              _hover={{
                bg: 'blue.500'
              }}
              isLoading={isSubmitting}
              disabled={values.text.length === 0 || isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
}
