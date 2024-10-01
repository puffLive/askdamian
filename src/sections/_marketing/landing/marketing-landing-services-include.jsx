import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const SERVICES = [
  {
    title: "Step 1: Discovery",
    description:
      "Our process begins with an in-depth discovery phase. We take the time to understand your unique financial situation, family dynamics, and long-term goals.",
    icon: "/assets/icons/ic_statistics.svg",
  },
  {
    title: "Step 2: Determination of Family Objectives",
    description:
      "Next, we work with you to determine your specific family objectives. Whether you're looking to grow your investments, protect your assets, plan for retirement, or ensure a smooth transition of wealth to the next generation, we help you define clear and achievable goals.",
    icon: "/assets/icons/ic_social_media.svg",
  },
  {
    title: "Step 3: Analysis and Recommendations",
    description:
      "Once we have a thorough understanding of your financial situation and objectives, our team conducts a detailed analysis. We evaluate various strategies and tools to identify the best options for preserving your wealth",
    icon: "/assets/icons/ic_real_time.svg",
  },
  {
    title: "Step 4: Implementation",
    description:
      "With a solid plan in place, we move to the implementation phase. Our team works diligently to put your customized wealth preservation strategy into action. This may involve restructuring investments, setting up trusts, revising estate plans, or optimizing tax strategies.",
    icon: "/assets/icons/ic_checklist.svg",
  },
  {
    title: "Step 5: Follow Up",
    description:
      "We believe that wealth preservation is an ongoing process. After implementation, we provide continuous support and follow-up. Regular reviews and updates ensure that your plan remains aligned with your evolving circumstances and goals.",
    icon: "/assets/icons/ic_report.svg",
  },
  {
    title: "Step 6: Legacy Planning",
    description:
      "To truly secure your family's financial future, we offer comprehensive legacy planning services. This step involves creating a detailed plan for how your wealth will be managed and distributed according to your wishes. ",
    icon: "/assets/icons/ic_file.svg",
  },
];

// ----------------------------------------------------------------------

export default function MarketingServicesInclude() {
  return (
    <Container
      sx={{
        textAlign: "center",
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
      id="family"
    >
      <Typography variant="h2" sx={{ mt: 15 }}>
        Family Wealth Preservation
      </Typography>

      <Typography
        sx={{
          mt: 3,
          mx: "auto",
          maxWidth: 480,
          color: "text.secondary",
          mb: { xs: 8, md: 10 },
        }}
      >
        We're committed to guiding you through every step of your financial
        journey. Preserving your family's wealth is our top priority, and our
        comprehensive approach ensures that your financial legacy is secure for
        generations to come.
      </Typography>

      <Box
        sx={{
          rowGap: 8,
          columnGap: 10,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {SERVICES.map((value) => (
          <div key={value.title}>
            <SvgColor
              src={value.icon}
              color="info"
              sx={{
                width: 64,
                height: 64,
                mx: "auto",
                bgcolor: "primary.main",
              }}
            />

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
              {value.title}
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              {" "}
              {value.description}{" "}
            </Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
}
