import { InputBase, InputBaseProps, useTheme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = InputBaseProps & {
  name: string;
  shouldDirty?: boolean;
};

export default function RHFInputbase({ name, shouldDirty, ...other }: Props) {
  const theme = useTheme();
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputBase
          {...field}
          fullWidth
          value={field.value}
          onChange={(event) => setValue(name, event.target.value, { shouldDirty: shouldDirty })}
          sx={{
            px: 1,
            height: 56,
            flexShrink: 0,
            borderTop: `solid 1px ${theme.palette.divider}`,
          }}
          {...other}
        />
      )}
    />
  );
}
