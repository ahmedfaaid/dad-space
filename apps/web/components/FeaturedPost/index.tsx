import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

interface FeaturedPostProps {
  id: number;
  headline: string;
  text: string;
  postedBy: string;
  createdAt: string;
  ups: string;
  comments: number;
  topic: string;
}

export default function FeaturedPost({
  id,
  headline,
  text,
  postedBy,
  createdAt,
  ups,
  comments,
  topic
}: FeaturedPostProps) {
  return (
    <Flex
      px={8}
      py={6}
      mb={4}
      mx='auto'
      w='80%'
      h='250px'
      justify='center'
      direction='column'
      position='relative'
      bg='white'
      color='#7B7B7B'
      boxShadow='md'
      borderRadius={4}
    >
      <Box textAlign='center' position='absolute' top={8}>
        <ChevronUpIcon
          w={6}
          h={6}
          _hover={{ color: 'star-command-blue' }}
          cursor='pointer'
        />
        <Text color='star-command-blue'>{ups}</Text>
        <ChevronDownIcon
          w={6}
          h={6}
          _hover={{ color: 'star-command-blue' }}
          cursor='pointer'
        />
      </Box>
      <Flex
        minW='70px'
        h='25px'
        position='absolute'
        top='10px'
        right='10px'
        justify='center'
        align='center'
        border='1px'
        borderColor='star-command-blue'
      >
        <Text fontSize='sm' color='star-command-blue'>
          {topic}
        </Text>
      </Flex>
      <Box width='80%' mx='auto'>
        <Box>
          <Heading as='h2' size='sm' mb={2} color='black'>
            {headline}
          </Heading>
          <Text fontSize='xs'>{text.substring(0, 500)}...</Text>
        </Box>
        <Divider my={4} />
        <Grid templateColumns='repeat(3, 1fr)'>
          <Flex align='center'>
            <Avatar size='xs' src='https://bit.ly/broken-link' w={5} h={5} />
            <Text ml={2} fontSize='xs'>
              Posted by{' '}
              <Link color='star-command-blue' fontSize='xs'>
                {postedBy}
              </Link>
            </Text>
          </Flex>
          <Text justifySelf='center' fontSize='xs'>
            {createdAt}
          </Text>
          <Flex align='center' justifySelf='end'>
            <ChatIcon w={3} h={3} mr={2} />
            <Text fontSize='xs'>{comments > 50 ? '50+' : comments}</Text>
          </Flex>
        </Grid>
      </Box>
    </Flex>
  );
}
