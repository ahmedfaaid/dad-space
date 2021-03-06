import * as Yup from 'yup';

export const signupSchema = Yup.object({
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
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address'),
  password: Yup.string().required('Please enter your password')
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Please enter your email address')
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Please enter a password'),
  confirmNewPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

export const createPostSchema = Yup.object({
  headline: Yup.string().required('Headline is required'),
  text: Yup.string()
    .max(500, 'Text must be less than 500 characters long')
    .required('Text is required')
});
