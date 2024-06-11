import Box from "@mui/material/Box";
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Container from "@mui/material/Container";
import TimelineItem from "@mui/lab/TimelineItem";
import Typography from "@mui/material/Typography";
import TimelineContent from "@mui/lab/TimelineContent";
import { alpha, useTheme } from "@mui/material/styles";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator";

import { useResponsive } from "src/hooks/use-responsive";

import { bgGradient } from "src/theme/css";

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    step: "STEP 1",
    title: "Fact Finding",
    description:
      "We start by getting to know you and your business. Our advisors will conduct an in-depth assessment to gather all relevant financial data, understand your business structure, and identify your current financial situation. This foundation allows us to provide personalized advice that truly fits your needs.",
  },
  {
    step: "STEP 2",
    title: "Determine Business Objectives",
    description:
      "We work with you to clarify your business objectives. Whether you aim to expand your business, plan for succession, or maximize your retirement savings, we help you set clear, achievable goals. Your aspirations drive our strategy.",
  },
  {
    step: "STEP 3",
    title: "Analysis and Recommendations",
    description:
      "With a clear understanding of your objectives, we conduct a thorough analysis of your financial landscape. We assess various planning options and identify opportunities for optimization. Our recommendations are tailored to your specific situation, covering areas such as small business deductions, capital gain deductions, corporate-owned life insurance, and the capital dividend account.",
  },
  {
    step: "STEP 4",
    title: "Implementation",
    description:
      "Once you’re confident with the strategy, we help you put it into action. Our team assists with the practical steps of implementation, ensuring a smooth transition. This might include setting up trusts, drafting buy and sell agreements, or executing an estate freeze. We handle the details so you can focus on running your business.",
  },
  {
    step: "STEP 5",
    title: "Follow Up",
    description:
      "Our commitment to your success doesn’t end with implementation. We provide ongoing support and follow-up to ensure your financial plan remains effective as your business evolves. Regular reviews allow us to adjust strategies as needed, keeping you on track to meet your goals.",
  },
];

const COLORS = ["primary", "secondary", "warning", "success", "primary"];

// ----------------------------------------------------------------------

export default function MarketingLandingServicesHowItWork() {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: "/assets/background/overlay_2.jpg",
        }),
        color: "common.white",
        py: { xs: 10, md: 15 },
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          For Business Owners
        </Typography>

        <Typography
          sx={{
            mt: 3,
            mx: "auto",
            opacity: 0.72,
            maxWidth: 480,
            textAlign: "center",
            mb: { xs: 8, md: 10 },
          }}
        >
          We understand the unique challenges and opportunities that come with
          running a business
        </Typography>

        <Timeline position={mdUp ? "alternate" : "right"}>
          {TIMELINES.map((value, index) => (
            <TimelineItem
              key={value.title}
              sx={{
                "&:before": {
                  ...(!mdUp && { display: "none" }),
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot color={COLORS[index]} />
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ pb: { xs: 3, md: 5 } }}>
                <Typography
                  variant="overline"
                  sx={{ color: `${COLORS[index]}.main` }}
                >
                  {value.step}
                </Typography>

                <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.72,
                    maxWidth: { md: 360 },
                    ...(index % 2 && {
                      ml: "auto",
                    }),
                  }}
                >
                  {value.description}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
}
