import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { alpha, Fab, Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type RHFRadioGroupProps = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  disabled?: boolean;
  showIcon?: boolean;
  highlightBorder?: boolean;
  color?: "default" | "primary" | "secondary" | "error" | "success" | "info" | "warning";
  renderLabel?: null | ((option: { label: string; additionalData: string; highlightText: string | undefined }) => React.ReactNode);
};

export default function RHFRadioGroup({ row, name, label, options, spacing, helperText, disabled, showIcon, highlightBorder = false, color = "default",renderLabel, ...other }: RHFRadioGroupProps) {
  const theme = useTheme();
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  const getLabel = (labelText: string) => {
    if (showIcon) {
      const initial = labelText[0];
      return (
        <Stack direction="row" alignItems="center" p={1.5}>
          <Fab sx={{ minHeight: 'unset', height: '32px', width: '32px', boxShadow: 'none', backgroundColor: theme.palette.grey[500] }}>{initial}</Fab>
          <Typography variant="subtitle1" sx={{ pl: 1 }}>
            {labelText}
          </Typography>
        </Stack>
      );
    }

    return labelText;
  };

  const getBGColor = (
    field: {
      value: string;
    },
    option: {
      value: string;
    }
  ) => {
    if (showIcon) {
      return field.value === option.value ? `${alpha(theme.palette.grey[500], 0.08)}` : 'unset';
    }
    else if (highlightBorder) {
      return field.value === option.value ? `${theme.palette.grey[100]}` : 'unset';
    }
    return 'unset';
  };

  const getBorderColor = (
    field: {
      value: string;
    },
    option: {
      value: string;
    }
  ) => {
    if (highlightBorder)
      return field.value === option.value ? `1px solid ${theme.palette.grey[800]}` : `1px solid ${theme.palette.grey[300]}`

    return 'initial'
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" sx={{ width: showIcon ? '100%' : 'unset' }}>
          {label && (
            <Typography component="legend" variant="subtitle2" id={labelledby}>
              {label}
            </Typography>
          )}

          <Box sx={{ ml: 2 }}>
            <RadioGroup {...field} aria-labelledby={labelledby} row={row} {...other}>
              {options.map((option) => {
                return (
                  <FormControlLabel
                    disabled={disabled}
                    key={option.value}
                    value={option.value}
                    control={<Radio color={color} />}
                    label={renderLabel ? renderLabel(option) : getLabel(option.label)}
                    sx={{
                      backgroundColor: getBGColor(field, option),
                      borderRadius: 1.5,
                      mr: 0.5,
                      '&:not(:last-of-type)': {
                        mb: spacing || 0,
                      },
                      ...(row && {
                        mr: 0,
                        '&:not(:last-of-type)': {
                          mr: spacing || 2,
                        },
                      }),
                      padding: 1,
                      border: getBorderColor(field, option),
                    }}
                  />
                );
              })}
            </RadioGroup>
          </Box>

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
