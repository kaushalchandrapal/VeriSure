import { Card, CardContent, Stack, useTheme } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

export default function Main({ children, sx, ...other }: BoxProps) {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #000 0%, #5F3D9E 252.22%)',
        ...sx,
      }}
      {...other}
    >
      <Stack justifyContent="center" alignItems="center" height="100vh">
        <Card
          sx={{
            boxShadow: theme.shadows[4],
            width: {
              xs: '90%',
              sm: 580,
              md: 580,
            },
            minWidth: {
              xs: '90%',
              sm: 300,
              md: 518,
            },
            marginX: {
              xs: 1,
              sm: 2,
            },
            paddingBottom: 3,
          }}
        >
          <CardContent sx={{ padding: 6, paddingBottom: 6 }}>{children}</CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
