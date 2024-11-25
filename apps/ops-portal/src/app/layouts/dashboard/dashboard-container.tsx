import { Box, Container, SxProps, Theme } from '@mui/material';
import { useSettingsContext } from '@verisure-core';
import { ReactNode } from 'react';

const PADDING = {
  lg: { px: 5, py: 2 },
  sm: { px: 3, py: 3 },
  clientProfile: { px: 2, py: 2 },
};

interface IDashboardContainerType {
  children: ReactNode;
  disablePadding?: boolean;
  disableRestrictStretch?: boolean;
  variant?: keyof typeof PADDING;
  sx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
  ref?: any;
}

const DashboardContainer = ({ disablePadding, disableRestrictStretch, variant = 'lg', containerSx, children, ref, ...other }: IDashboardContainerType) => {
  const settings = useSettingsContext();
  const px = disablePadding ? 0 : PADDING[variant].px;
  const py = disablePadding ? 0 : PADDING[variant].py;
  const stretch = settings.themeStretch ? false : 'xl';

  return (
    <Box {...other} minHeight="100%">
      <Container maxWidth={!disableRestrictStretch ? stretch : false} sx={{ minHeight: '100%', px, py, ...containerSx }} disableGutters ref={ref}>
        {children}
      </Container>
    </Box>
  );
};

export default DashboardContainer;
