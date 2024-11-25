import { Stack, Typography, useTheme } from "@mui/material"
import { DASHBOARD_CONFIG } from "@verisure-commons"
import { useOffSetTop } from "@verisure-core";

const Footer = () => {
  const theme = useTheme();
  const offset = useOffSetTop(DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT);
  return (
    <Stack
      sx={{
        height: DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT,
        zIndex: theme.zIndex.appBar + 1,
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.text.primary,
        boxShadow: offset ? theme.shadows[19] : 'none',
      }}
    >
      <Stack
        width='100vw'
        justifyContent='center'
        alignItems='center'
        height='100%'
      >
        <Stack>
          <Typography variant="body2" color="text.disabled">
            &copy; 2024 {' '}
            <Typography component='span' variant="body2" color="primary">
              VeriSure
            </Typography>.{' '}
            All rights reserved.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Footer