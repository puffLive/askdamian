import { HashLink } from "react-router-hash-link";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Iconify from "src/components/iconify";

import { BOOKING_URL, SERVICES_PATH } from "./config";

// ----------------------------------------------------------------------

export default function BlogCta({
  title = "Book a Financial Planning Consultation",
  description = "Every family's situation is different. Talk it through with Damian in a free, no-obligation planning session and leave with clear next steps.",
}) {
  return (
    <Box
      component="section"
      aria-label="Book a consultation"
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 2,
        color: "common.white",
        textAlign: { xs: "center", md: "left" },
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="center"
      >
        <Box
          component="img"
          src="/assets/legacy-images/lwa-logo-192x192.png"
          alt=""
          sx={{ width: 80, height: 80, flexShrink: 0 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="overline"
            component="p"
            sx={{ color: "primary.lighter" }}
          >
            Build • Protect • Transfer
          </Typography>
          <Typography variant="h4" component="h2" sx={{ my: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            {description}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent={{ xs: "center", md: "flex-end" }}
        sx={{ mt: 3 }}
      >
        <Button
          component={HashLink}
          to={SERVICES_PATH}
          smooth
          variant="outlined"
          size="large"
          sx={{
            color: "common.white",
            borderColor: "rgba(255,255,255,0.5)",
            "&:hover": { borderColor: "common.white" },
          }}
        >
          Explore Our Financial Planning Services
        </Button>
        <Button
          href={BOOKING_URL}
          target="_blank"
          rel="noopener"
          variant="contained"
          size="large"
          endIcon={<Iconify icon="carbon:launch" />}
          sx={{
            bgcolor: "primary.lighter",
            color: "grey.800",
            "&:hover": { bgcolor: "warning.lighter" },
          }}
        >
          Speak With a Financial Planner
        </Button>
      </Stack>
    </Box>
  );
}
