import { object, string } from "yup";

export const loginSchema = object().shape({
  usernameOrEmail: string().required(),
  password: string().required(),
});

export const loginDefaultValues = {
  usernameOrEmail: '',
  password: '',
};