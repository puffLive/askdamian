import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Iconify from "src/components/iconify";
import SvgColor from "src/components/svg-color";
import TextMaxLine from "src/components/text-max-line";
import { HashLink } from "react-router-hash-link";

// ----------------------------------------------------------------------

const COLORS = ["primary", "secondary", "success", "warning"];

const SERVICES = [
  {
    name: "Family",
    icon: "/assets/icons/service/ic_service_seo.svg",
    content: "Preserving your family's wealth is our top priority",
    path: "#family",
  },
  {
    name: "Pension",
    icon: "/assets/icons/service/ic_service_mail.svg",
    content: "Understanding pensions",
    path: "#pension",
  },
  {
    name: "Business",
    icon: "/assets/icons/service/ic_service_analysis.svg",
    content: "We understand the unique challenges and opportunities",
    path: "#business",
  },
  {
    name: "Estate Planning ",
    icon: "/assets/icons/service/ic_service_bullhorn.svg",
    content: "In-depth financial planning",
    path: "#financial-planning",
  },
];

// ----------------------------------------------------------------------

export default function MarketingLandingServices() {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
      id="services"
    >
      <Stack
        spacing={3}
        sx={{
          maxWidth: 480,
          mb: { xs: 8, md: 5 },
          mx: { xs: "auto", md: "unset" },
          textAlign: { xs: "center", md: "unset" },
        }}
      >
        <Typography variant="overline" sx={{ color: "text.disabled" }}>
          Our Services
        </Typography>

        <Typography variant="h2">We Provide</Typography>

        <Typography sx={{ color: "text.secondary" }}>
          We provide a many different services for many different needs.
        </Typography>
      </Stack>

      <Box
        sx={{
          gap: 4,
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {SERVICES.map((service, index) => (
          <ServiceItem key={service.name} service={service} index={index} />
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function ServiceItem({ service, index }) {
  const { name, icon, content, path } = service;

  return (
    <Card
      sx={{
        px: 4,
        py: 5,
        textAlign: "center",
        ...(index === 1 && {
          py: { xs: 5, md: 8 },
        }),
        ...(index === 2 && {
          py: { xs: 5, md: 10 },
          boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
        }),
      }}
    >
      <SvgColor
        src={icon}
        sx={{
          width: 88,
          height: 88,
          mx: "auto",
          color: (theme) => theme.palette[COLORS[index]].main,
        }}
      />

      <Stack spacing={1} sx={{ my: 5 }}>
        <TextMaxLine variant="h6">{name}</TextMaxLine>
        <TextMaxLine variant="body2" sx={{ color: "text.secondary" }}>
          {content}
        </TextMaxLine>
      </Stack>

      <IconButton
        component={HashLink}
        to={path}
        smooth
        color={
          (index === 0 && "primary") ||
          (index === 1 && "secondary") ||
          (index === 2 && "success") ||
          "warning"
        }
      >
        <Iconify icon="carbon:direction-straight-right" />
      </IconButton>
    </Card>
  );
}

ServiceItem.propTypes = {
  index: PropTypes.number,
  service: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
    content: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  }),
};
