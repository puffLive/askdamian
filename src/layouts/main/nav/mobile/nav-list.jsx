import PropTypes from "prop-types";

import Collapse from "@mui/material/Collapse";

import { usePathname } from "src/routes/hooks";

import { useBoolean } from "src/hooks/use-boolean";

import { NavSectionVertical } from "src/components/nav-section";

import NavItem from "./nav-item";
import { HashLink } from "react-router-hash-link";
import { isNavItemActive } from "../../config-navigation";

// ----------------------------------------------------------------------

export default function NavList({ data, onClick }) {
  const pathname = usePathname();

  const active = isNavItemActive(data.path, pathname);

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
      aria-current={active ? "page" : undefined}
    />
  );
}

NavList.propTypes = {
  data: PropTypes.object,
};
