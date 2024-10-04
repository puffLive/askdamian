import PropTypes from "prop-types";

import Collapse from "@mui/material/Collapse";

import { useActiveLink } from "src/routes/hooks/use-active-link";

import { useBoolean } from "src/hooks/use-boolean";

import { NavSectionVertical } from "src/components/nav-section";

import NavItem from "./nav-item";
import { HashLink } from "react-router-hash-link";

// ----------------------------------------------------------------------

export default function NavList({ data, onClick }) {
  const active = useActiveLink(data.path, !!data.children);

  const menuOpen = useBoolean();

  return (
    <NavItem
      open={menuOpen.value}
      onClick={onClick}
      //
      title={data.title}
      component={HashLink}
      to={data.path}
      smooth
      //
      active={active}
    />
  );
}

NavList.propTypes = {
  data: PropTypes.object,
};
