import { Controller, useFormContext } from 'react-hook-form';

import { UploadAvatar } from '../upload';
import ErrorComponent from './error-component';
import { IRHFUploadType } from './rhf-upload';

const RHFUploadAvatar = ({ name, helperText, ...other }: Omit<IRHFUploadType, 'multiple'>) => {
  const { control, setValue } = useFormContext();

  const onDrop = (acceptedFiles: File[]) => {
    const value = acceptedFiles[0];

    setValue(name, value, { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <UploadAvatar
            {...field}
            error={!!error}
            onDrop={onDrop}
            file={field.value}
            {...other}
            helperText={error?.message ? <ErrorComponent message={error?.message} /> : helperText}
          />
        );
      }}
    />
  );
};

export default RHFUploadAvatar;
