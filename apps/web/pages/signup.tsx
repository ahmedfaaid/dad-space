import { useState } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Layout from '../components/layout';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <Flex mt={4} align='center' justify='center'>
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
          <Stack align='center'>
            <Heading fontSize='4xl' textAlign='center'>
              Sign up
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded='lg'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow='lg'
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id='firstName' isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type='text' />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id='lastName'>
                    <FormLabel>Last Name</FormLabel>
                    <Input type='text' />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h='full'>
                    <Button
                      variant='ghost'
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  bg='star-command-blue'
                  color='white'
                  _hover={{
                    bg: 'blue.500'
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align='center'>
                  Already a user?{' '}
                  <NextLink href='/login' passHref>
                    <Link color='star-command-blue'>Login</Link>
                  </NextLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
