import { Helmet } from "react-helmet-async";

import HomeView from "src/sections/_home/view/home-view";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Legacy Wealth Advisory</title>
      </Helmet>

      <HomeView />
    </>
  );
}
