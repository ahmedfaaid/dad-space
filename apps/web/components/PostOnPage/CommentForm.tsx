import { Box, Flex, Textarea, Button, Text, Link } from '@chakra-ui/react';

export default function CommentForm({
  user,
  handleSubmit,
  handleChange,
  isSubmitting
}) {
  return (
    <Box mt={8}>
      <Text mb={2} fontSize='sm'>
        Comment as{' '}
        <Link color='star-command-blue' fontSize='sm'>
          {user.firstName} {user.lastName}
        </Link>
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex direction='column'>
          <Textarea onChange={handleChange} placeholder='What do you think?' />
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
  );
}
