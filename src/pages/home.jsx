import { Helmet } from "react-helmet-async";

import MarketingLandingPage from "./marketing/landing";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Legacy Wealth Advisory</title>
      </Helmet>

      <MarketingLandingPage />
    </>
  );
}
