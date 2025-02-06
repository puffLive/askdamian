import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { HashLink } from "react-router-hash-link";

import { useResponsive } from "src/hooks/use-responsive";

import { bgGradient } from "src/theme/css";

import Image from "src/components/image";
import Iconify from "src/components/iconify";

// ----------------------------------------------------------------------

export default function MarketingLandingHero() {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  const heroImages = [
    {
      url: "/assets/legacy-images/lwa-elephant-herd.jpg",
      description: "elephant herd",
    },
    {
      url: "/assets/legacy-images/lwa-multigenerational-people-hugging.jpg",
      description: "Multi-generational people hugging",
    },
    {
      url: "/assets/legacy-images/lwa-palms-of-the-father-and-mother.jpg",
      description: "Father and mother's hands holding babys feet",
    },
    {
      url: "/assets/legacy-images/lwa-senior-couple-holding-hands.jpg",
      description: "Senior couple holding hands on the beach",
    },
  ];

  const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)];

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_1.jpg",
        }),
        overflow: "hidden",
        mt: 15,
      }}
    >
      <Container
        sx={{
          py: 15,
          display: { md: "flex" },
          alignItems: { md: "center" },
          height: { md: `100vh` },
        }}
        id="home"
      >
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="overline" sx={{ color: "primary.light" }}>
              Financial Services
            </Typography>

            <Typography variant="h1" sx={{ my: 3 }}>
              Welcome to Legacy Wealth Advisory
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              Step into a New Era of Estate and Succession Planning
            </Typography>

            <Stack
              spacing={3}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", md: "unset" }}
              justifyContent={{ xs: "center", md: "unset" }}
              sx={{ mt: 5 }}
            >
              <Button
                // component={HashLink}
                href="https://calendly.com/planningwithdamian/30minwithdamian"
                target="_blank"
                variant="contained"
                color="inherit"
                size="large"
                // to="#join"
                // smooth
              >
                Free Consultation
              </Button>

              <Stack
                component={HashLink}
                direction="row"
                alignItems="center"
                sx={{ typography: "h6" }}
                to="#services"
                smooth
              >
                <Fab size="medium" sx={{ mr: 1 }} color="secondary">
                  <Iconify width={24} icon="carbon:play" />
                </Fab>
                Our Services
              </Stack>
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={6} lg={7}>
              <Box
                component="img"
                src={randomImage.url}
                alt={randomImage.description}
                // visibleByDefault
                // disabledEffect
                sx={{
                  width: "100%",
                  height: "auto",
                  maskImage: `linear-gradient(to top, transparent, black 15%),linear-gradient(to bottom, transparent, black 15%),linear-gradient(to left, transparent, black 15%),linear-gradient(to right, transparent, black 15%)`,
                  WebkitMaskImage: `linear-gradient(to top, transparent, black 15%),linear-gradient(to bottom, transparent, black 15%),linear-gradient(to left, transparent, black 15%),linear-gradient(to right, transparent, black 15%)`,
                  maskComposite: "destination-in",
                  WebkitMaskComposite: "destination-in",
                }}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
