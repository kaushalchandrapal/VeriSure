import React, { useRef } from "react";
import { Box, Button, Typography, Paper, Container, useTheme, Stack, Card, CardContent } from "@mui/material";
import { m } from "framer-motion";
import { VeriSureLogo } from "@verisure-assets";
import Header from "./header";
import ThreeSphere from "./three-sphere";
import { useResponsive } from "@verisure-core";
import { AdministrationLanding, AssetManagementLanding, BankingLanding, WealthManagementLanding } from "@verisure-commons";
import Grid from '@mui/material/Grid2';
import AppWidget from "./widget";


const LandingPage = () => {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');

  // Create refs for sections
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const ctaRef = useRef(null);
  const sectorsRef = useRef(null);

  // Scroll to section function
  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const linkStyle = {
    cursor: "pointer",
    color: theme.palette.text.secondary,
    "&:hover": { color: theme.palette.primary.main },
  };

  return (
    <>
      {/* Header */}
      <Header scrollToSection={scrollToSection} featuresRef={featuresRef} howItWorksRef={howItWorksRef} ctaRef={ctaRef} sectorsRef={sectorsRef} />

      {/* Hero Section */}
      <Box
        id="hero-section"
        sx={{
          bgcolor: theme.palette.grey[900],
          color: "secondary.main",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ThreeSphere />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <m.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Stack
              sx={{
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <Stack
                // width={ lg: '40%', sm}
                sx={{
                  width: { lg: '40%', sm: '100%' },
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <VeriSureLogo />
              </Stack>
              <Typography variant="h5" align="center" gutterBottom>
                Secure. Efficient. Reliable KYC Processes.
              </Typography>
              <Box mt={4}>
                <m.div whileHover={{ scale: 1.1 }}>
                  <Button variant="contained" color="secondary" onClick={() => window.open("https://veri-sure-nine.vercel.app/auth/login", "_blank")}>
                    Get Started
                  </Button>
                </m.div>
              </Box>
            </Stack>
          </m.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        ref={featuresRef}
        sx={{
          bgcolor: theme.palette.background.default,
          py: 8,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" align="center" gutterBottom>
              Why Choose VeriSure?
            </Typography>
            <Grid container spacing={4} mt={4}>
              {/* Individuals Column */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  For Individuals
                </Typography>
                {[
                  {
                    title: "Streamlined KYC Submission",
                    description: "Easily upload and manage your identity documents, saving time and effort.",
                  },
                  {
                    title: "Real-Time Status Updates",
                    description: "Track your KYC progress instantly with complete transparency.",
                  },
                  {
                    title: "AI-Driven Accuracy",
                    description: "AI-powered validation ensures quick and accurate document processing.",
                  },
                  {
                    title: "Privacy and Security",
                    description: "Benefit from robust encryption and privacy compliance for your sensitive data.",
                  },
                ].map((feature, index) => (
                  <m.div whileHover={{ scale: 1.05 }} key={index}>
                    <Stack
                      sx={{
                        p: 3,
                        textAlign: "center",
                        height: "100%",
                        minHeight: 130,
                      }}
                    >
                      <AppWidget icon={"solar:user-bold-duotone"} title={feature.title} description={feature.description} color="warning" />
                    </Stack>
                    {/* <Paper
                      elevation={3}
                      sx={{
                        p: 3,
                        textAlign: "center",
                        height: "100%",
                        mb: 2,
                        minHeight: 130,
                      }}
                    >
                      <Stack flexDirection='column' justifyContent='center' height='100%' padding='auto'>
                        <Stack>
                          <Typography variant="h6" gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body1">{feature.description}</Typography>
                        </Stack>
                      </Stack>
                    </Paper> */}
                  </m.div>
                ))}
              </Grid>

              {/* Corporates Column */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                  For Corporates
                </Typography>
                {[
                  {
                    title: "Centralized KYC Management",
                    description: "Receive and organize KYC submissions in a standardized PDF format.",
                  },
                  {
                    title: "Enhanced Efficiency",
                    description: "Automate document validation with AI, reducing manual effort and errors.",
                  },
                  {
                    title: "Secure Data Sharing",
                    description: "Access only authorized KYC data while maintaining data integrity and compliance.",
                  },
                  {
                    title: "Customizable Permissions",
                    description: "Tailor KYC access and sharing settings to suit organizational needs.",
                  },
                ].map((feature, index) => (
                  <m.div whileHover={{ scale: 1.05 }} key={index}>
                    <Stack
                      sx={{
                        p: 3,
                        textAlign: "center",
                        height: "100%",
                        minHeight: 130,
                      }}
                    >
                      <AppWidget icon={"fluent:building-bank-16-filled"} title={feature.title} description={feature.description} color="info" />
                    </Stack>
                  </m.div>
                ))}
              </Grid>
            </Grid>
          </m.div>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box
        ref={howItWorksRef}
        sx={{
          bgcolor: theme.palette.grey[900],
          py: 8,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h2" align="center" gutterBottom color="primary">
              How It Works
            </Typography>
            <Grid container spacing={4} mt={4}>
              {[
                {
                  title: "Step 1: General User Submits Request",
                  description: "General users submit KYC requests with all required documents for verification.",
                },
                {
                  title: "Step 2: Supervisor Reviews and Assigns",
                  description:
                    "The supervisor reviews the case and assigns it to a caseworker for further processing.",
                },
                {
                  title: "Step 3: AI Verification",
                  description:
                    "The caseworker requests AI to verify the submitted documents. AI processes and validates the documents.",
                },
                {
                  title: "Step 4: Manual Verification",
                  description:
                    "After AI verification, the caseworker manually reviews and finalizes the verification process.",
                },
              ].map((step, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <m.div whileHover={{ scale: 1.05 }}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        textAlign: "center",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography variant="body1">{step.description}</Typography>
                    </Paper>
                  </m.div>
                </Grid>
              ))}
            </Grid>
          </m.div>
        </Container>
      </Box>


      {/* Sectors We Operate In Section */}
      <Box
        ref={sectorsRef}
        sx={{
          py: 8,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Stack
              sx={{
                margin: "0 auto",
                textAlign: "center",
              }}
            >

              <Typography variant="h2" align="center" gutterBottom>
                Sectors We Operate In
              </Typography>

              <Grid container spacing={4} marginTop={4}>
                {[
                  {
                    title: "Wealth Management",
                    description:
                      "VeriSure transforms onboarding and ongoing monitoring for Wealth Managers by seamlessly integrating regulatory compliance with an exceptional client experience. By enabling faster onboarding, identifying beneficial owners within complex structures, and reducing costs through automation, VeriSure provides a competitive edge tailored to the unique needs of each firm.",
                    component: <WealthManagementLanding />,
                  },
                  {
                    title: "Asset Management",
                    description:
                      "VeriSure revolutionizes efficiency and adaptability for asset managers facing manual compliance challenges. Our solution provides customizable policies to ensure regulatory alignment, accommodating diverse risk profiles and investment objectives. With a streamlined onboarding process and client-centric dashboards offering real-time monitoring, VeriSure delivers an accelerated client onboarding experience and improved operational performance.",
                    component: <AssetManagementLanding />,
                  },
                  {
                    title: "Banking",
                    description:
                      "The banking sector experiences a high volume of transactions and ever-evolving customer expectations. VeriSure automates complex verification processes, ensuring seamless compliance with changing regulations through secure document handling and ID verification for authenticity. Real-time monitoring provides actionable insights into transactions and customer behavior, while customizable policies address unique compliance requirements. VeriSure empowers banks to enhance operational efficiency, maintain regulatory compliance, and meet the demands of high customer expectations with confidence.",
                    component: <BankingLanding />,
                  },
                  {
                    title: "Fund Administration",
                    description:
                      "Fund Administrators face ongoing challenges from evolving regulations, resource limitations, and cost pressures. VeriSure streamlines processes with a fully digital KYC onboarding platform, addressing due diligence complexities and enabling risk assessment against potential threats. With configurable policies and a robust risk engine, VeriSure redefines operational efficiency through seamless API-first integrations. Leveraging AI and ML technologies, VeriSure empowers fund administrators to enhance efficiency, strengthen risk management, and achieve superior regulatory compliance.",
                    component: <AdministrationLanding />,
                  },
                ].map((sector, index) => (
                  <Grid size={{ xs: 12, md: 12 }} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: index%2 === 0 ? "row" : 'row-reverse' },
                        alignItems: "center",
                        textAlign: { xs: "center", md: "left" },
                        padding: 3,
                        height: "100%",
                        bgcolor: theme.palette.common.white
                      }}
                    >
                      <Box
                        sx={{
                          marginBottom: { xs: 2, md: 0 },
                          marginRight: { xs: 0, md: 2 },
                        }}
                      >
                        {sector.component}
                      </Box>
                      
                      <Box>
                        <Typography
                          color="primary"
                          variant="h5"
                          sx={{
                            align: { xs: "center", md: "left" }
                          }}
                          gutterBottom
                        >
                          {sector.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            align: { xs: "center", md: "left" }
                          }}
                          color={theme.palette.common.black}
                        >
                          {sector.description}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>

            </Stack>
          </m.div>
        </Container>
      </Box>

      <Box
        ref={ctaRef}
        sx={{
          py: 8,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Stack
              sx={{
                margin: "0 auto",
                textAlign: "center",
              }}
            >

              <Typography variant="h2" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
                Join VeriSure today to simplify and secure your KYC processes. It's quick, reliable, and efficient.
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                <m.div whileHover={{ scale: 1.1 }}>
                  <Button variant="contained" color="secondary" size="large" onClick={() => window.open("https://veri-sure-nine.vercel.app/auth/register", "_blank")}>
                    Sign Up Now
                  </Button>
                </m.div>
                <m.div whileHover={{ scale: 1.1 }}>
                  <Button variant="outlined" color="secondary" size="large">
                    Learn More
                  </Button>
                </m.div>
              </Stack>
            </Stack>
          </m.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: theme.palette.grey[900],
          color: theme.palette.grey[300],
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                About VeriSure
              </Typography>
              <Typography variant="body2">
                VeriSure simplifies KYC processes with AI-driven verification, ensuring secure and reliable identity management.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body1"
                  sx={linkStyle}
                  onClick={() => scrollToSection(featuresRef)}
                >
                  Features
                </Typography>
                <Typography
                  variant="body1"
                  sx={linkStyle}
                  onClick={() => scrollToSection(howItWorksRef)}
                >
                  How It Works
                </Typography>
                <Typography
                  variant="body1"
                  sx={linkStyle}
                  onClick={() => scrollToSection(sectorsRef)}
                >
                  Sectors
                </Typography>
                <Typography
                    variant="body1"
                    sx={linkStyle}
                    onClick={() => scrollToSection(ctaRef)}
                  >
                    Get Started
                  </Typography>
              </Stack>
            </Grid>

            {/* Contact Information */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">Email: support@verisure.com</Typography>
              <Typography variant="body2">Phone: +1 800-123-4567</Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              textAlign: "center",
              mt: 4,
              borderTop: `1px solid ${theme.palette.grey[700]}`,
              pt: 2,
            }}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} VeriSure. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>


    </>
  );
};

export default LandingPage;
