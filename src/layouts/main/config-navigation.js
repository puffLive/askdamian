// ----------------------------------------------------------------------

// Section links point at "/#section" so they also work from other pages
// (for example from a blog article back to the home page).
export const navConfig = [
  { title: "Home", path: "/#home" },
  {
    title: "Services",
    path: "/#services",
  },
  { title: "About US", path: "/#advisor" },
  { title: "Blog", path: "/blog" },
];

// A page link (no "#") is active on its own path and any path below it.
export function isNavItemActive(path, pathname) {
  if (path.includes("#")) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}
