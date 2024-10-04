import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Masonry from "@mui/lab/Masonry";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Button, { buttonClasses } from "@mui/material/Button";

import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";

import { useBoolean } from "src/hooks/use-boolean";
import { useResponsive } from "src/hooks/use-responsive";

import { _socials } from "src/_mock";

import Logo from "src/components/logo";
import Iconify from "src/components/iconify";

import { navConfig } from "./config-navigation";

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: "5px 12px",
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive("up", "md");

  const currentYear = new Date().getFullYear();

  const simpleFooter = (
    <Container sx={{ py: 8, textAlign: "center" }}>
      <Logo single />

      <Typography
        variant="body1"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Legacy Wealth Advisory
      </Typography>

      <Typography
        variant="body2"
        component="div"
        sx={{ color: "text.primary" }}
      >
        14-30 Eglinton Ave W, Mississauga, ON L5R 0C1
      </Typography>

      <Typography
        variant="body2"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Cell: 416-471-3766 | Office: 905-840-2222
      </Typography>

      <Typography
        variant="body2"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Email: damian@legacywealthadvisory.ca
      </Typography>

      <Typography
        variant="caption"
        component="div"
        sx={{ color: "text.secondary" }}
      >
        © {currentYear}. All rights reserved
      </Typography>
    </Container>
  );

  return <footer>{simpleFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list.subheader}</Typography>

      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
              ...(active && {
                color: "text.primary",
                fontWeight: "fontWeightSemiBold",
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={
            listExpand.value ? "carbon:chevron-down" : "carbon:chevron-right"
          }
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                },
                ...(pathname === `${link.path}/` && {
                  color: "text.primary",
                  fontWeight: "fontWeightSemiBold",
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      <StyledAppStoreButton
        startIcon={<Iconify icon="ri:apple-fill" width={28} />}
      >
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton
        startIcon={<Iconify icon="logos:google-play-icon" width={28} />}
      >
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
