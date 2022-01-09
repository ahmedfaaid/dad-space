import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter a valid email address'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Please enter a password'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
