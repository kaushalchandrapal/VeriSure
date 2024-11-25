import { object, string } from "yup";

export const newKycRequestValidationSchema = object().shape({
  documentType: string().required(),
  documentName: string().required(),
});

export const newKycRequestDefaultValues = {
  documentType: 'Driving License',
  documentName: '',
};