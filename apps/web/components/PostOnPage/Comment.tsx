import { Box, Text } from '@chakra-ui/react';

export default function Comment({ comment }) {
  return (
    <Box key={comment.id}>
      <Text>{comment.text}</Text>
    </Box>
  );
}
