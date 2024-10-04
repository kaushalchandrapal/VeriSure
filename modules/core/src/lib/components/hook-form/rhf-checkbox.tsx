import { Controller, useFormContext } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel, { FormControlLabelProps, formControlLabelClasses } from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { Iconify } from '../iconify';


// ----------------------------------------------------------------------

export interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  color?: string;
  helperText?: React.ReactNode;
}

export function RHFCheckbox({ name, helperText, color = '', ...other }: RHFCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={<Checkbox {...field}
              checked={field.value}
              sx={{
                '&.Mui-checked': {
                  color: color ? color : 'initial',
                },
              }}
            />
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="mingcute:alert-fill" />
                  {error?.message}
                </Box>
              ) : (
                helperText
              )}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

export interface RHFMultiCheckboxProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string;
  options: { label: string; value: any; disabled?: boolean }[];
  row?: boolean;
  label?: string;
  color?: 'error' | 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning';
  spacing?: number;
  helperText?: React.ReactNode;
  customcolor?: string;
}

export function RHFMultiCheckbox({ row, name, label, options, spacing, helperText, color = 'default', sx, ...other }: RHFMultiCheckboxProps) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item) ? selectedItems.filter((value) => value !== item) : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <Typography component="legend" variant="subtitle2">
              {label}
            </Typography>
          )}

          <Box sx={{ ml: 2 }}>
            <FormGroup
              sx={{
                ...(row && {
                  flexDirection: 'row',
                }),
                [`& .${formControlLabelClasses.root}`]: {
                  '&:not(:last-of-type)': {
                    mb: spacing || 0,
                  },
                  ...(row && {
                    mr: 0,
                    '&:not(:last-of-type)': {
                      mr: spacing || 2,
                    },
                  }),
                },
                gap: 1.5,
                ...sx,
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      color={color}
                      checked={field.value.includes(option.value)}
                      onChange={() => field.onChange(getSelected(field.value, option.value))}
                      disabled={option.disabled || false}
                      sx={{
                        '&.Mui-checked': {
                          color: other.customcolor ? other.customcolor : color,
                        },
                      }}
                    />
                  }
                  label={option.label}
                  {...other}
                />
              ))}
            </FormGroup>
          </Box>

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="mingcute:alert-fill" />
                  {error?.message}
                </Box>
              ) : (
                helperText
              )}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
