import { paths } from "src/routes/paths";

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    order: "1",
    subheader: "Services",
    cover: "assets/images/menu/menu_marketing.jpg",
    items: [
      { title: "Services", path: paths.services.root },
      { title: "Businesses", path: paths.services.businesses },
      { title: "Pension", path: paths.services.pension },
      { title: "Families", path: paths.services.families },
      { title: "Financial Planning", path: paths.services.financialPlanning },
      { title: "Estate Planning", path: paths.services.estatePlanning },
    ],
  },
];

export const navConfig = [
  { title: "Home", path: "/" },
  {
    title: "Services",
    path: paths.services,
    children: [pageLinks[0]],
  },
  { title: "Contact Us", path: paths.contactus },
];
