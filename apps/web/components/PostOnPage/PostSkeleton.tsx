import {
  Skeleton,
  Box,
  Heading,
  Flex,
  Avatar,
  Divider,
  Textarea,
  Button,
  Text,
  Link
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, ChatIcon } from '@chakra-ui/icons';

export default function PostSkeleton() {
  return (
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
}
