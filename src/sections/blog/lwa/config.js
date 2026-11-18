// Settings shared by the blog pages.

export const SITE_URL = "https://legacywealthadvisory.ca";
export const SITE_NAME = "Legacy Wealth Advisory";

export const BLOG_TITLE = "Financial Planning Insights";
export const BLOG_DESCRIPTION =
  "Educational articles on Canadian financial planning, retirement, pensions, insurance, estate planning and investing from Legacy Wealth Advisory.";

// The same booking page used by the "Free Planning Session" button in the header.
export const BOOKING_URL =
  "https://calendly.com/planningwithdamian/30minwithdamian";
export const SERVICES_PATH = "/#services";

export const DEFAULT_SHARE_IMAGE = "/assets/legacy-images/lwa-logo-512x512.png";

export const absoluteUrl = (url) =>
  url.startsWith("http") ? url : `${SITE_URL}${url}`;
