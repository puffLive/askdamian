import { useRef } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { useResponsive } from "src/hooks/use-responsive";
import { useBoundingClientRect } from "src/hooks/use-bounding-client-rect";

import { bgGradient } from "src/theme/css";

import Carousel, {
  useCarousel,
  CarouselDots,
  CarouselArrows,
} from "src/components/carousel";

import MarketingTeamItem from "./marketing-team-item";

// ----------------------------------------------------------------------

export default function MarketingTeam({ members }) {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  const carousel = useCarousel({
    dots: !mdUp,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...CarouselDots({
      sx: {
        mt: 8,
      },
    }),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        // settings: { slidesToShow: 3 },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        // settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        // settings: { slidesToShow: 1 },
      },
    ],
  });

  const containerRef = useRef(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: "/assets/background/overlay_2.jpg",
        }),
        overflow: "hidden",
        position: "relative",
        py: { xs: 10, md: 20 },
      }}
      id="advisor"
    >
      <Container
        sx={{
          left: { md: 0 },
          right: { md: 0 },
          mb: { xs: 8, md: 0 },
          position: { xs: "relative", md: "absolute" },
          height: { md: "calc(100% - 320px)" },
          mt: 10,
        }}
      >
        <Grid container spacing={3} justifyContent="space-between">
          <Grid xs={12} md={5}>
            <Stack
              marginTop={-6}
              spacing={2}
              sx={{ textAlign: { xs: "center", md: "unset" } }}
            >
              <Typography variant="h3" sx={{ color: "primary.main" }}>
                Meet Your Wealth Management Advisor
              </Typography>

              <Typography sx={{ color: "common.white" }}>
                Damian Alexander, a Financial Planner and Chartered Life
                Underwriter (CLU), has over 20 years of experience helping
                individuals and businesses achieve financial success.
                Specializing in tax planning, retirement, pensions, and estate
                strategies, Damian creates personalized financial strategies
                tailored to evolving needs. Inspired by finance at age 12, he's
                passionate about simplifying financial planning. A proud board
                member, Damian also enjoys boxing, salsa dancing, running, and
                more. Partner with him for expert guidance on your financial
                journey.
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Box ref={containerRef} />
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          pl: `${offsetLeft}px`,
          width: { md: `calc(70%)` },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {members.map((member) => (
            <Box
              key={member.id}
              sx={{
                ml: "-1px",
                pl: { xs: 2, md: 4 },
                pr: { xs: 2, md: 0 },
                color: "common.white",
              }}
            >
              <MarketingTeamItem member={member} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

MarketingTeam.propTypes = {
  members: PropTypes.array,
};
