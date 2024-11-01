import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import { Chip, Stack } from '@mui/material';
import { CustomPopover, Iconify, IJwtPayload, jwtDecode, usePopover, useRouter, useSnackbar, varHover } from '@verisure-core';
// import { GearIcon, LogOutIcon } from '@zeta-core/assets';
import { RouterLinks } from '../../app-route-paths';
import { signOut } from '../../auth/jwt';
import { useEffect, useState } from 'react';
// import { signOut } from '../../auth/jwt';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();
  const theme = useTheme();
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState<IJwtPayload | null>(null);
  // const { firstName, lastName, role } = useUserDetailsStore((state) => state.user);
  // const profileProgressStore = useProfileProgressStore((state) => state);

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await signOut();
      // profileProgressStore.updateProfileSetupStatus(null, false);
      popover.onClose();
      router.replace('/');
    } catch (error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const decoded = jwtDecode(accessToken);
    setDecodedToken(decoded);
  }, []);

  // const handleSettings = () => {
  //   popover.setOpen(null);
  //   if (role === 'Admin') setTimeout(() => navigate(RouterLinks.organisationProfile), 200);
  //   else setTimeout(() => navigate(RouterLinks.myProfile), 200);
  // };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          alt={decodedToken?.username}
          sx={{
            width: 36,
            height: 36,
            bgcolor: theme.palette.background.default,
            color: theme.palette.action.active,
          }}
        >
          {decodedToken?.username?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover {...popover} sx={{ width: 350, p: 0 }}>
        <Stack
          sx={{
            p: 2,
            pb: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
          gap={1}
        >
          <Avatar sx={{ width: 62, height: 62, background: theme.palette.grey[300] }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.grey[600] }}>
              {decodedToken?.username?.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>
          <Typography variant="h6" noWrap>
            {decodedToken?.username}
          </Typography>
          <Chip label={decodedToken?.role} variant="soft" size="small" />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mx: 1 }} />

        <Divider sx={{ borderStyle: 'dashed', mx: 1 }} />

        <MenuItem onClick={handleLogout} sx={{ my: 1, mx: 2, fontWeight: 'fontWeightBold', color: 'error.main', justifyContent: 'center' }}>
          <Iconify icon="mdi-light:logout" />
          <Typography variant="body2"> Logout</Typography>
        </MenuItem>
      </CustomPopover>
    </>
  );
}
