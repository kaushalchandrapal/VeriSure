import { Controller, useFormContext } from 'react-hook-form';
// @mui
import FormHelperText from '@mui/material/FormHelperText';
import Slider, { SliderProps } from '@mui/material/Slider';

// ----------------------------------------------------------------------

export type RHFSliderProps = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
};

export default function RHFSlider({ name, helperText, valueLabelDisplay, ...other }: RHFSliderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay={valueLabelDisplay ?? 'auto'} {...other} />

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </>
      )}
    />
  );
}
