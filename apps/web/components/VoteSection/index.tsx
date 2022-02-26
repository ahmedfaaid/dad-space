import { Box, IconButton, Text } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useVoteMutation } from 'dad-gql';
import { Post } from '../../types';

interface VoteSectionProps {
  post: Post;
}

export default function VoteSection({ post }: VoteSectionProps) {
  const [_, vote] = useVoteMutation();

  return (
    <Box textAlign='center' position='absolute' top={7}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }

          await vote({
            value: 1,
            postId: post.id
          });
        }}
        aria-label='Up vote'
        _hover={{ color: 'star-command-blue' }}
        cursor='pointer'
        color={post.voteStatus === 1 && 'star-command-blue'}
        variant='ghost'
        icon={<ChevronUpIcon w={6} h={6} />}
      />
      <Text color='star-command-blue'>{post.voteCount}</Text>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }

          await vote({
            value: -1,
            postId: post.id
          });
        }}
        aria-label='Up vote'
        _hover={{ color: 'star-command-blue' }}
        cursor='pointer'
        color={post.voteStatus === -1 && 'star-command-blue'}
        variant='ghost'
        icon={<ChevronDownIcon w={6} h={6} />}
      />
    </Box>
  );
}
