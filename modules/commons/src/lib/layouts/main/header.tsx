import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';



import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';
import { bgBlur, useOffSetTop } from '@verisure-core';
import { DASHBOARD_CONFIG } from '../common/constants';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const offset = useOffSetTop(DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT);

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
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >

          <Box sx={{ flexGrow: 1 }} />

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>

            <SettingsButton
              sx={{
                ml: { xs: 1, md: 0 },
                mr: { md: 2 },
              }}
            />
          </Stack>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
