import { Helmet } from "react-helmet-async";

import MarketingLandingView from "src/sections/_marketing/view/marketing-landing-view";

// ----------------------------------------------------------------------

export default function MarketingLandingPage() {
  return (
    <>
      <Helmet>
        <title>Legacy Wealth Advisory</title>
      </Helmet>

      <MarketingLandingView />
    </>
  );
}
