import { CSSProperties } from 'react';
import { FieldValues, FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

export interface FormProviderProps<TFieldValues extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<TFieldValues>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
  formId?: string;
}

export default function FormProvider<TFieldValues extends FieldValues>({ children, onSubmit, methods, formId, style }: FormProviderProps<TFieldValues>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} noValidate id={formId} style={style}>
        {children}
      </form>
    </Form>
  );
}
