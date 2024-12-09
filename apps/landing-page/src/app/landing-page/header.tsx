import React, { useState, useEffect } from "react";
import { AppBar, Stack, Toolbar, Typography, useTheme, useMediaQuery } from "@mui/material";
import { SettingsButton } from "@verisure-commons";
import { VeriSureLogo } from "@verisure-assets";
import { DASHBOARD_CONFIG } from "@verisure-commons";

interface IHeader {
  scrollToSection: (ref: React.MutableRefObject<null>) => void;
  featuresRef: React.MutableRefObject<null>;
  howItWorksRef: React.MutableRefObject<null>;
  ctaRef: React.MutableRefObject<null>;
  sectorsRef: React.MutableRefObject<null>;
}

const Header = ({ scrollToSection, featuresRef, howItWorksRef, ctaRef, sectorsRef }: IHeader) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [isSticky, setIsSticky] = useState(false);

  // Detect scroll to toggle AppBar background
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero-section")?.offsetHeight || 0;
      setIsSticky(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkStyle = {
    cursor: "pointer",
    color: theme.palette.text.secondary,
    "&:hover": { color: theme.palette.primary.main },
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: DASHBOARD_CONFIG.HEADER.DESKTOP_HEIGHT,
        zIndex: theme.zIndex.appBar + 1,
        bgcolor: theme.palette.grey[900],
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "100%",
          px: { lg: 5 },
        }}
      >

        {/* Navigation Links */}
        {isDesktop && (
          <Stack direction="row" justifyContent="end" width="100%" spacing={4} marginRight={4}>
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
        )}

        {/* Right Side Settings Button */}
        <Stack
          alignItems="center"
          direction={{ xs: "row-reverse", md: "row-reverse" }}
          spacing={1}
        >
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
