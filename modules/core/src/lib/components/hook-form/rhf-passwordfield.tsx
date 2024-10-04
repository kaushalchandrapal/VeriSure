import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CustomToolTip } from '../custom-tooltip';
import { RHFTextField } from './rhf-text-field';
import { Iconify } from '../iconify';

export interface IPasswordFieldSchema {
  methods: UseFormReturn<any>;
  name: string;
  label: string;
  noToolTip?: boolean;
  toolTips?: {
    title: string;
    regex?: RegExp | string;
    disabled?: boolean;
    showFailed?: boolean;
  }[];
  toolTipHeading?: string;
}
const RHFPasswordField = ({ methods, name, label, noToolTip, toolTips, toolTipHeading }: IPasswordFieldSchema) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Stack spacing={1}>
      <RHFTextField
        name={name}
        required
        label={label}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: !noToolTip ? (
            <InputAdornment position="end">
              <CustomToolTip toolTipHeading={toolTipHeading || ''} value={methods.watch(name)} toolTips={toolTips || []}>
                <IconButton edge="end">
                  <Iconify icon="ic:twotone-info" />
                </IconButton>
              </CustomToolTip>
            </InputAdornment>
          ) : null,
        }}
      />
      <Box>
        <Button startIcon={showPassword ? <Iconify icon="solar:eye-closed-bold" /> : <Iconify icon="solar:eye-bold" />} onClick={() => setShowPassword((x) => !x)} color="primary">
          <Typography variant="caption">{showPassword ? 'Hide' : 'Show'} Password</Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default RHFPasswordField;
