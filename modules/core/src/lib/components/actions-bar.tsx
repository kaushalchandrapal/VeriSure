import { Box, BoxProps, SxProps, Theme, useTheme } from '@mui/material';

export function ActionsBar({ children, sx, ...others }: BoxProps & { sx?: SxProps<Theme> }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        background: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[900],
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        zIndex: 'drawer',
        ...sx,
      }}
      {...others}
    >
      {children}
    </Box>
  );
}
