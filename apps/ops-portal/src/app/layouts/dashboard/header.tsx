import { AppBar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, SvgIcon, Toolbar, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router';

import { Iconify, RouterLink, useOffSetTop, useResponsive } from '@verisure-core';
// import { DASHBOARD_CONFIG } from '../common/constants';
// import { ILinkType } from '../common/types';
import AccountPopover from './account-popover';
import { VeriSureLogo } from '@verisure-assets';
import { ReactNode } from 'react';
import { RouterLinks } from '../../app-route-paths';
import { DASHBOARD_CONFIG, SettingsButton } from '@verisure-commons';

export interface ILinkType {
  title: string;
  path: string;
  icon: () => ReactNode;
}

export interface Props {
  navData?: ILinkType[];
  noData?: boolean;
  hideNavOptions?: boolean;
}

const Header = ({ navData, noData, hideNavOptions }: Props) => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { pathname } = useLocation();
  const offset = useOffSetTop(DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT);

  const linkColor = (active: boolean) => {
    let color;

    if (active) {
      color = theme.palette.primary.light;
    } else if (theme.palette.mode === 'dark') {
      color = theme.palette.text.primary;
    } else {
      color = theme.palette.background.default;
    }

    return color;
  };

  return (
    <AppBar
      sx={{
        height: DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT,
        zIndex: theme.zIndex.appBar + 1,
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.text.primary,
        boxShadow: offset ? theme.shadows[19] : 'none',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: '100%',
          px: { lg: 5 },
        }}
      >
        <Stack
          width={120}
          sx={{
            margin: lgUp ? 0 : '0 auto',
          }}
        >
          <VeriSureLogo />
        </Stack>

        {lgUp && (
          <Stack direction="row" justifyContent="center" width="100%" gap={4} />
        )}

        <Stack alignItems="center" direction={{ xs: 'row-reverse', md: 'row-reverse' }} spacing={1}>
          {!noData ? <AccountPopover /> : null}

          <SettingsButton
            sx={{
              ml: { xs: 1, md: 0 },
              mr: { md: 2 },
            }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
