import PropTypes from "prop-types";
import { forwardRef } from "react";

import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import ListItemButton from "@mui/material/ListItemButton";

import { useBoolean } from "src/hooks/use-boolean";

// ----------------------------------------------------------------------

const NavItem = forwardRef(
  ({ title, path, open, active, hasChild, externalLink, ...other }, ref) => {
    const menuOpen = useBoolean();

    const renderContent = (
      <StyledNavItem ref={ref} active={active} {...other}>
        <Box component="span" sx={{ flexGrow: 1 }}>
          {title}
        </Box>
      </StyledNavItem>
    );

    return <div onClick={menuOpen.onToggle}>{renderContent}</div>;
  }
);

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  path: PropTypes.string,
  subItem: PropTypes.bool,
  title: PropTypes.string,
  hasChild: PropTypes.bool,
  externalLink: PropTypes.bool,
};

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active, theme }) => ({
  ...theme.typography.body1,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(1.5),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.fontSecondaryFamily,
  ...(active && {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightSemiBold,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  }),
}));
