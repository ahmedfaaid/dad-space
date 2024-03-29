import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
import { loginSchema } from '../utils/formValidation';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const {
    authContext: { login }
  } = useContext(AuthContext);

  const { handleSubmit, handleChange, values, isSubmitting, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: loginSchema,
      onSubmit: async (values, { setSubmitting }) => {
        const res = await login(values);

        if (!res.ok) {
          toast({
            title: 'Login unsuccessful',
            description: `There was an error logging in: ${res.errors}`,
            status: 'error',
            duration: 9000,
            isClosable: true
          });
          setSubmitting(false);
        } else if (res.ok) {
          toast({
            title: 'Login Successful',
            description: 'You have successfully logged in!',
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
              Login
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
                <Flex mt={2}>
                  <NextLink href='/forgot-password' passHref>
                    <Link ml='auto'>Forgot password?</Link>
                  </NextLink>
                </Flex>
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
                    Login
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align='center'>
                    Not a registered user?{' '}
                    <NextLink href='/signup' passHref>
                      <Link color='star-command-blue'>Sign up</Link>
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
