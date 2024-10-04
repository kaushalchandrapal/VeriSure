import { Controller, useFormContext } from 'react-hook-form';
// @mui
//
import { Upload, UploadProps } from '../upload';

// ----------------------------------------------------------------------

export interface IRHFUploadType extends UploadProps {
  name: string;
}

const RHFUpload = ({ name, multiple, helperText, ...other }: IRHFUploadType) => {
  const { control, setValue } = useFormContext();

  if (multiple) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          const uploadProps = {
            multiple,
            accept: { 'image/*': [] },
            error: !!error,
            helperText: error?.message ?? helperText,
          };
          const onDrop = (acceptedFiles: File[]) => {
            const value = multiple ? [...field.value, ...acceptedFiles] : acceptedFiles[0];

            setValue(name, value, { shouldValidate: true });
          };

          return <Upload {...uploadProps} value={field.value[0]} onDrop={onDrop} onDelete={() => field.onChange([])} {...other} />;
        }}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const uploadProps = {
          accept: { 'image/*': [] },
          error: !!error,
          helperText: error?.message ?? helperText,
        };

        return <Upload {...uploadProps} value={field.value[0]} onDrop={field.onChange} onDelete={() => field.onChange([])} {...other} />;
      }}
    />
  );
};

export default RHFUpload;
