import {
  _brands,
  _members,
  _caseStudies,
  _testimonials,
  _marketingPosts,
  _pricingMarketing,
} from "src/_mock";

import MarketingTeam from "../team/marketing-team";
import MarketingNewsletter from "../marketing-newsletter";
import MarketingOurClients from "../marketing-our-clients";
import MarketingLandingHero from "../landing/marketing-landing-hero";
import MarketingLandingFaqs from "../landing/marketing-landing-faqs";
import MarketingLandingAbout from "../landing/marketing-landing-about";
import MarketingTestimonial from "../testimonial/marketing-testimonial";
import MarketingLandingFreeSEO from "../landing/marketing-landing-free-seo";
import MarketingLandingServices from "../landing/marketing-landing-services";
import BlogMarketingLatestPosts from "../../blog/marketing/marketing-latest-posts";
import MarketingLandingCaseStudies from "../landing/marketing-landing-case-studies";
import { PARTNERS } from "src/assets/data/partnerLogos";
import MarketingLandingServicesHowItWork from "../landing/marketing-landing- services-how-it-work";
import MarketingServicesInclude from "../landing/marketing-landing-services-include";
import MarketingServicesBenefits from "../landing/marketing-landing-services-benefits";
import MarketingAboutStory from "../landing/marketing-landing-about-story";

// ----------------------------------------------------------------------

const realMembers = [
  {
    id: 1,
    role: "Financial Advisor",
    name: "Damian Alexander",
    photo: `/assets/images/portrait/damian-alexander_profile-image.jpeg`,
    socialLinks: {
      facebook: `/`,
      instagram: `/`,
      linkedin: `/`,
      twitter: `/`,
    },
  },
];

export default function MarketingLandingView() {
  console.log("PARTNERS", PARTNERS);
  console.log("_brands", _brands);
  return (
    <>
      <MarketingLandingHero />

      <MarketingOurClients brands={PARTNERS} />

      <MarketingLandingAbout />

      <MarketingLandingServices />

      <MarketingLandingServicesHowItWork />

      <MarketingServicesInclude />

      <MarketingServicesBenefits />

      <MarketingAboutStory />

      {/* <MarketingLandingProcess /> */}

      <MarketingLandingCaseStudies caseStudies={_caseStudies.slice(-6)} />

      <MarketingTeam members={realMembers} />

      {/* <PricingMarketing plans={_pricingMarketing} /> */}

      <MarketingLandingFaqs />

      <MarketingTestimonial testimonials={_testimonials} />

      <BlogMarketingLatestPosts posts={_marketingPosts.slice(0, 4)} />

      <MarketingLandingFreeSEO />

      {/* <MarketingNewsletter /> */}
    </>
  );
}
