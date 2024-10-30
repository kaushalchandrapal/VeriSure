import { object, ref, string } from "yup";

export const registerSchema = object().shape({
  email: string().email('Invalid email format').required('Email is required'),
  username: string().required('Username is required'),
  password: string().required('Password is required'),
  verifyPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password'), ''], 'Passwords must match'),
});


export const registerDefaultValues = {
  username: '',
  email: '',
  password: '',
  verifyPassword: '',
};