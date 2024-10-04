import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Portal from "@mui/material/Portal";
import Grid from "@mui/material/Unstable_Grid2";
import ListSubheader from "@mui/material/ListSubheader";

import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";
import { useActiveLink } from "src/routes/hooks/use-active-link";

import { useBoolean } from "src/hooks/use-boolean";

import Label from "src/components/label";
import Image from "src/components/image";

import NavItem from "./nav-item";
import { HashLink } from "react-router-hash-link";

// ----------------------------------------------------------------------

export default function NavList({ data }) {
  const pathname = usePathname();

  return (
    <NavItem
      //
      title={data.title}
      component={HashLink}
      to={data.path}
      smooth
    />
  );
}

NavList.propTypes = {
  data: PropTypes.object,
};

// ----------------------------------------------------------------------

function NavSubList({ subheader, isNew, cover, items }) {
  const pathname = usePathname();

  const coverPath = items.length ? items[0].path : "";

  const commonList = subheader === "Common";

  return (
    <Stack spacing={2}>
      {/* <ListSubheader
        sx={{
          p: 0,
          typography: "h6",
          color: "text.primary",
          bgcolor: "transparent",
        }}
      >
        {subheader}
        {isNew && (
          <Label color="info" sx={{ ml: 1 }}>
            NEW
          </Label>
        )}
      </ListSubheader> */}

      {/* {!commonList && (
        <Link component={RouterLink} href={coverPath}>
          <Image
            disabledEffect
            alt={cover}
            src={cover || "/assets/placeholder.svg"}
            ratio="16/9"
            sx={{
              borderRadius: 1,
              cursor: "pointer",
              boxShadow: (theme) => theme.customShadows.z8,
              transition: (theme) => theme.transitions.create("all"),
              "&:hover": {
                opacity: 0.8,
                boxShadow: (theme) => theme.customShadows.z24,
              },
            }}
          />
        </Link>
      )} */}

      <Stack spacing={1.5} alignItems="flex-start">
        {items.map((item) => {
          // const active = pathname === item.path || pathname === `${item.path}/`;

          return (
            <NavItem
              key={item.title}
              title={item.title}
              path={item.path}
              // active={active}
              subItem
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

NavSubList.propTypes = {
  cover: PropTypes.string,
  isNew: PropTypes.bool,
  items: PropTypes.array,
  subheader: PropTypes.string,
};
