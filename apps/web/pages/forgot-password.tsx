import { useContext } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Layout from '../components/layout';
import { forgotPasswordSchema } from '../utils/formValidation';
import { AuthContext } from '../context/auth';

export default function ForgotPassword() {
  const {
    authContext: { forgotPassword }
  } = useContext(AuthContext);
  const toast = useToast();
  const { handleSubmit, handleChange, values, isSubmitting, errors } =
    useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values, { setSubmitting }) => {
        await forgotPassword(values);
        toast({
          title: 'Forgot Password',
          description: 'Check your email for a reset link',
          status: 'info',
          duration: 9000,
          isClosable: true
        });
        setSubmitting(false);
      }
    });

  return (
    <Layout>
      <Flex mt={4} align='center' justify='center'>
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
          <Stack align='center'>
            <Heading fontSize='4xl' textAlign='center'>
              Enter your email address
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              to reset your password.
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
                  {errors.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                    Send Reset Link
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}
