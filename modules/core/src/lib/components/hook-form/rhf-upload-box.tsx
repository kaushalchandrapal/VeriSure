import { Controller, useFormContext } from 'react-hook-form';

import { UploadBox } from '../upload';
import { IRHFUploadType } from './rhf-upload';

const RHFUploadBox = ({ name, ...other }: IRHFUploadType) => {
  const { control } = useFormContext();

  return (
    <Controller name={name} control={control} render={({ field, fieldState: { error } }) => <UploadBox files={field.value} error={!!error} {...other} />} />
  );
};

export default RHFUploadBox;
