import dayjs from "dayjs";
import { date, object, ref, string } from "yup";

export const registerSchema = object().shape({
  email: string().email('Invalid email format').required('Email is required'),
  username: string().required('Username is required'),
  password: string().required('Password is required'),
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  address: string().required('Address is required'),
  birthdate: date()
    .required('Date of birth')
    .min(dayjs().subtract(150, 'year').toDate(), 'Please provide valid date of birth')
    .max(dayjs().subtract(18, 'year').toDate(), 'Please provide valid date of birth')
    .typeError('Please provide valid date of birth')
    .nullable(),
  verifyPassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password'), ''], 'Passwords must match'),
});


export const registerDefaultValues = {
  username: '',
  email: '',
  password: '',
  verifyPassword: '',
  firstName: '',
  lastName: '',
  address: '',
  birthdate: null,
};