import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import { signupSchema } from '../utils/formValidation';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const {
    authContext: { signup }
  } = useContext(AuthContext);

  const { handleSubmit, handleChange, values, isSubmitting, errors, touched } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validationSchema: signupSchema,
      onSubmit: async (values, { setSubmitting }) => {
        const { confirmPassword, ...user } = values;
        const res = await signup(user);

        if (!res.ok) {
          toast({
            title: 'Signup unsuccessful',
            description: `There was an error signing up: ${res.errors}`,
            status: 'error',
            duration: 9000,
            isClosable: true
          });
          setSubmitting(false);
        } else if (res.ok) {
          toast({
            title: 'Signup Successful',
            description: 'You have successfully signed up!',
            status: 'success',
            duration: 9000,
            isClosable: true
          });
          router.push('/');
          setSubmitting(false);
        }
      }
    });

  return (
    <Box>
      <Flex mt={4} align='center' justify='center'>
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
          <Stack align='center'>
            <Heading fontSize='4xl' textAlign='center'>
              Sign up
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              to start interacting with other dads ✌️
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
                  {errors.firstName && touched ? (
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  ) : null}
                  {errors.lastName && touched ? (
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
                    autoComplete='off'
                  />
                  {errors.email && touched ? (
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
                  {errors.password && touched ? (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                  <FormLabel htmlFor='confirmPassword'>
                    Confirm Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id='confirmPassword'
                      type={showPassword ? 'text' : 'password'}
                      name='confirmPassword'
                      value={values.confirmPassword}
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
                  {errors.confirmPassword && touched ? (
                    <FormErrorMessage>
                      {errors.confirmPassword}
                    </FormErrorMessage>
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
    </Box>
  );
}
