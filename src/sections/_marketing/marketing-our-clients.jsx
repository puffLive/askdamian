import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import SvgColor from "src/components/svg-color";
import Carousel, { useCarousel } from "src/components/carousel";

import { Divider, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function MarketingOurClients({ brands }) {
  const theme = useTheme();

  const carousel = useCarousel({
    speed: 5000,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2 },
      },
    ],
  });

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
      }}
    >
      <Divider>
        <Typography variant="body1" sx={{ color: "text.disabled" }}>
          Our Partners
        </Typography>
      </Divider>
      <Carousel {...carousel.carouselSettings}>
        {brands.map((brand) => (
          <SvgColor
            key={brand.id}
            src={brand.image}
            sx={{
              width: 250,
              height: 80,
              color: "text.disabled",
            }}
          />
        ))}
      </Carousel>
    </Container>
  );
}

MarketingOurClients.propTypes = {
  brands: PropTypes.array,
};
