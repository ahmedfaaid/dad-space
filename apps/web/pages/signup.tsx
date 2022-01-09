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
  Link,
  FormErrorMessage
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { useMutation } from 'urql';
import { useSignupMutation } from 'dad-gql';
import Layout from '../components/layout';
import { validationSchema } from '../utils/formValidation';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [, signup] = useSignupMutation();
  const { handleSubmit, handleChange, values, isSubmitting, errors } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        console.log(values);
        const res = await signup({ user: values });

        if (res.data?.signup === null) {
          console.error('There was was error');
          setSubmitting(false);
          return;
        }

        setSubmitting(false);
      }
    });

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
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl isRequired isInvalid={!!errors.firstName}>
                      <FormLabel htmlFor='firstName'>First Name</FormLabel>
                      <Input
                        id='firstName'
                        type='text'
                        name='firstName'
                        value={values.firstName}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired isInvalid={!!errors.lastName}>
                      <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                      <Input
                        id='lastName'
                        type='text'
                        name='lastName'
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Box>
                  {errors.firstName ? (
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  ) : null}
                  {errors.lastName ? (
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  ) : null}
                </HStack>
                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel htmlFor='email'>Email address</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.password}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <InputGroup>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                    />
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
                  {errors.password ? (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  ) : null}
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
                    isLoading={isSubmitting}
                    type='submit'
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
            </form>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
