import { object, ref, string } from "yup";

export const createNewUserSchema = object().shape({
  email: string().email('Invalid email format').required('Email is required'),
  username: string().required('Username is required'),
  password: string().required('Password is required'),
  verifyPassword: string()
  .required('Please confirm your password')
  .oneOf([ref('password'), ''], 'Passwords must match'),
  role: string().required('Role is required'),
});


export const createNewUserDefaultValues = {
  username: '',
  email: '',
  password: '',
  verifyPassword: '',
  role: '',
};