import { Box, Card, CardContent, Container, Stack, useTheme } from "@mui/material";
import { useBoolean, useResponsive } from "@verisure-core";
import { NAV } from "../config-layout";
import NavVertical from "./nav-vertical";
import { RegistrationBottomIllustration, RegistrationTopIllustration, VeriSureLogo, VeriSureLogoLight } from "@verisure-assets";


type Props = {
  children: React.ReactNode;
};


export function RegisterLayout ({ children }: Props) {
  const theme = useTheme();
  const nav = useBoolean();
  const lgUp = useResponsive('up', 'lg');

  const renderNavVertical = <NavVertical openNav={nav.value} />;
  return (
    <Box
      sx={{
        minHeight: 1,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      {renderNavVertical}
      {lgUp ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: 1,
            display: "flex",
            flexDirection: "column",
            width: `calc(100vw - ${NAV.W_VERTICAL})`,
            marginTop: 3,
          }}
        >
          <Container maxWidth="md">{children}</Container>
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 1,
            display: 'flex',
            flexDirection:  'column',
            background: 'linear-gradient(180deg, #000 0%, #5F3D9E 252.22%)',
            justifyContent: 'center'
          }}
        >

          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 1000,
            }}
          >
            <RegistrationTopIllustration />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              zIndex: 1000,
            }}
          >
            <RegistrationBottomIllustration />
          </Box>
          <Stack alignItems='center'>

            <Box sx={{ width: 250, mb: 3 }}>
              <VeriSureLogo />
            </Box>
          </Stack>
          <Container maxWidth="md">
            <Stack flexDirection='row' justifyContent='center'>
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
                <CardContent>
                  {children}
                </CardContent>
              </Card>
            </Stack>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default RegisterLayout;