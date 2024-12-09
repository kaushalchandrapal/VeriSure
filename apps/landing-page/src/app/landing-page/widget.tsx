import { ApexOptions } from 'apexcharts';

import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Stack, { StackProps } from '@mui/material/Stack';
import { ColorSchema, Iconify } from '@verisure-core';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  icon: string;
  title: string;
  description: string;
  color?: ColorSchema;
}

export default function AppWidget({
  title,
  description,
  icon,
  color = 'primary',
  sx,
  ...other
}: Props) {

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        height: "100%",
        minHeight: 130,
        color: 'common.white',
        bgcolor: `${color}.dark`,
        ...sx,
      }}
      {...other}
    >

      <ListItemText
        sx={{ ml: 3 }}
        primary={title}
        secondary={description}
        primaryTypographyProps={{
          typography: 'h4',
          component: 'span',
        }}
        secondaryTypographyProps={{
          color: 'inherit',
          component: 'span',
          sx: { opacity: 0.64 },
          typography: 'subtitle2',
        }}
      />

      <Iconify
        icon={icon}
        sx={{
          width: 112,
          right: -32,
          height: 112,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </Stack>
  );
}
