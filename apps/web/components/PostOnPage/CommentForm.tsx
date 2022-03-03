import { Dispatch, SetStateAction } from 'react';
import { Box, Flex, Textarea, Button, Text, Link } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { User } from '../../types';

interface CommentFormProps {
  user: User;
  parentId?: string;
  parentCreator?: User;
  setShowReplyForm?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentForm({
  user,
  parentId,
  parentCreator,
  setShowReplyForm
}: CommentFormProps) {
  const { handleSubmit, handleChange, isSubmitting, values, resetForm } =
    useFormik({
      initialValues: {
        text: ''
      },
      onSubmit: async (values, { setSubmitting }) => {
        console.log(values);
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
