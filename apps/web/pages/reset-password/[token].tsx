import { useContext, useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Layout from '../../components/layout';
import { resetPasswordSchema } from '../../utils/formValidation';
import { AuthContext } from '../../context/auth';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const toast = useToast();
  const {
    authContext: { resetPassword }
  } = useContext(AuthContext);
  const { handleSubmit, handleChange, values, isSubmitting, errors } =
    useFormik({
      initialValues: {
        newPassword: '',
        confirmNewPassword: ''
      },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values, { setSubmitting }) => {
        const { newPassword } = values;
        const res = await resetPassword({ newPassword, token });

        if (!res.ok) {
          toast({
            title: 'Login unsuccessful',
            description: `There was an error resetting your password: ${res.errors}`,
            status: 'error',
            duration: 9000,
            isClosable: true
          });
          setSubmitting(false);
        } else if (res.ok) {
          toast({
            title: 'Login Successful',
            description: 'You have successfully reset your password!',
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
    <Layout>
      <Flex mt={4} align='center' justify='center'>
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
          <Stack align='center'>
            <Heading fontSize='4xl' textAlign='center'>
              Enter your new password.
            </Heading>
          </Stack>
          <Box
            rounded='lg'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow='lg'
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.newPassword}>
                  <FormLabel htmlFor='newPassword'>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      id='newPassword'
                      type={showPassword ? 'text' : 'password'}
                      name='newPassword'
                      value={values.newPassword}
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
                  {errors.newPassword ? (
                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.confirmNewPassword}>
                  <FormLabel htmlFor='confirmNewPassword'>
                    Confirm New Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id='confirmNewPassword'
                      type={showPassword ? 'text' : 'password'}
                      name='confirmNewPassword'
                      value={values.confirmNewPassword}
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
                  {errors.confirmNewPassword ? (
                    <FormErrorMessage>
                      {errors.confirmNewPassword}
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
                    Reset Password
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
