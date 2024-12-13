import React, { useState } from 'react';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useLocation } from 'react-router';
import { Iconify, RouterLink, useOffSetTop, useResponsive } from '@verisure-core';
import { VeriSureLogo } from '@verisure-assets';
import AccountPopover from './account-popover';
import { DASHBOARD_CONFIG, SettingsButton } from '@verisure-commons';
import { RouterLinks } from '../../app-route-paths';

export interface ILinkType {
  title: string;
  path: string;
  icon: string; // Changed to string to directly use iconify icons
}

export interface Props {
  navData?: ILinkType[];
  noData?: boolean;
  hideNavOptions?: boolean;
}

export const navData = [
  { title: 'Dashboard', path: RouterLinks.userDashboard, icon: 'ic:baseline-dashboard' },
  { title: 'My KYC', path: RouterLinks.kyc, icon: 'arcticons:secure-box' },
];

const Header = ({ noData, hideNavOptions }: Props) => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const { pathname } = useLocation();
  const offset = useOffSetTop(DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getLinkColor = (isActive: boolean) =>
    isActive
      ? theme.palette.primary.light
      : theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.background.default;

  const navButtonStyles = (active: boolean) => ({
    color: getLinkColor(active),
    '&:hover': { bgcolor: 'transparent !important' },
  });

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        sx={{
          height: DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT,
          zIndex: theme.zIndex.appBar + 1,
          bgcolor: theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : theme.palette.text.primary,
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
            <List component={Stack} direction="row" justifyContent="center" width="100%" gap={4} disablePadding>
              {!noData &&
                !hideNavOptions &&
                navData.map((item) => {
                  const active = pathname === item.path || pathname.startsWith(item.path);
                  return (
                    <ListItem disableGutters disablePadding sx={{ width: 'max-content' }} key={item.path}>
                      <ListItemButton
                        LinkComponent={RouterLink}
                        sx={navButtonStyles(active)}
                        aria-current={active ? 'page' : undefined}
                        disableGutters
                        disableRipple
                        disableTouchRipple
                        href={item.path}
                      >
                        <ListItemIcon>
                          <Iconify icon={item.icon} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography variant="body2">{item.title}</Typography>}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
            </List>
          )}

          <Stack alignItems="center" direction={{ xs: 'row-reverse', md: 'row-reverse' }} spacing={1}>
            {!lgUp && (
              <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                sx={{ ml: 2, color: theme.palette.text.primary }}
              >
                <Iconify icon="quill:hamburger-sidebar" color={theme.palette.grey[100]} />
              </IconButton>
            )}
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

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Stack direction="row" justifyContent="end" p={2}>
          <IconButton onClick={toggleDrawer(false)}>
            <Iconify icon="line-md:close" />
          </IconButton>
        </Stack>
        <List>
          {!noData &&
            !hideNavOptions &&
            <>
              <Stack flexDirection="row" justifyContent="center" alignItems="center" marginBottom={4}>
                <AccountPopover />
              </Stack>
              <Divider />
              {navData.map((item) => {
                const active = pathname === item.path || pathname.startsWith(item.path);
                return (
                  <ListItem disablePadding key={item.path}>
                    <ListItemButton
                      LinkComponent={RouterLink}
                      sx={navButtonStyles(active)}
                      href={item.path}
                      onClick={toggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <Iconify icon={item.icon} color={theme.palette.text.primary} />
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body2" color="text.primary">{item.title}</Typography>} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          }
        </List>
      </Drawer>
    </>
  );
};

export default Header;
