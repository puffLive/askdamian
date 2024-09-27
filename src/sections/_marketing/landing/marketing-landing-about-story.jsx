import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Timeline from "@mui/lab/Timeline";
import TimelineDot from "@mui/lab/TimelineDot";
import Container from "@mui/material/Container";
import TimelineItem from "@mui/lab/TimelineItem";
import Typography from "@mui/material/Typography";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineSeparator from "@mui/lab/TimelineSeparator";

import { useResponsive } from "src/hooks/use-responsive";

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    year: "Step 1",
    title: "Introduction and Relationship Building",
    description:
      "We start by getting to know you and your financial goals. This initial phase is about building trust and understanding your unique financial situation.",
  },
  {
    year: "Step 2",
    title: "Service Agreement",
    description:
      "We clearly outline the services we will provide, our responsibilities, and what you can expect throughout the financial planning process.",
  },
  {
    year: "Step 3",
    title: "Comprehensive Data Collection",
    description:
      "We gather all necessary financial information, including assets, liabilities, income, and expenses. We also take into account your risk tolerance, time horizon, and any specific financial goals.",
  },
  {
    year: "Step 4",
    title: "Goal Setting",
    description:
      "Together, we identify and prioritize your financial objectives, whether they involve retirement planning, education funding, estate planning, or other financial aspirations.",
  },
  {
    year: "Step 5",
    title: "Detailed Analysis",
    description:
      "We analyze your financial information to understand your current financial position and identify any gaps or opportunities.",
  },
  {
    year: "Step 6",
    title: "Strategy Development",
    description:
      "Based on our analysis, we develop tailored financial strategies that align with your goals. This may include investment planning, tax optimization, risk management, and more.",
  },
  {
    year: "Step 7",
    title: "Plan Creation",
    description:
      "We create a comprehensive financial plan that includes actionable recommendations and clear steps to achieve your financial goals.",
  },
  {
    year: "Step 8",
    title: "Presentation and Discussion",
    description:
      "We present the plan to you, ensuring you understand each component. We discuss the rationale behind our recommendations and answer any questions you may have.",
  },
  {
    year: "Step 9",
    title: "Action Plan",
    description:
      "We assist you in implementing the agreed-upon strategies. This might involve coordinating with other professionals, such as tax advisors or estate lawyers, to execute specific aspects of the plan.",
  },
  {
    year: "Step 10",
    title: "Ongoing Support",
    description:
      "Our team is here to provide continuous support, helping you navigate any challenges that arise and ensuring your plan stays on track.",
  },
  {
    year: "Step 11",
    title: "Regular Reviews",
    description:
      "Financial planning is an ongoing process. We schedule regular reviews to assess your progress and make necessary adjustments based on changes in your life or financial circumstances.",
  },
];

const COLORS = [
  "primary",
  "secondary",
  "warning",
  "success",
  "primary",
  "secondary",
  "warning",
  "success",
  "primary",
  "secondary",
  "warning",
];

// ----------------------------------------------------------------------

export default function MarketingAboutStory() {
  const mdUp = useResponsive("up", "md");

  return (
    <Box
      sx={{
        bgcolor: "background.neutral",
        py: { xs: 10, md: 15 },
      }}
      id="financial-planning"
    >
      <Container>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mx: "auto",
            textAlign: "center",
            mb: { xs: 8, md: 10 },
          }}
        >
          <Typography variant="h2">Estate Planning </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Our In-depth Financial Planning Process Our financial planning
            process adheres to the FP Canada standards, ensuring that you
            receive the highest level of professional service. Here’s how we
            work with you to create a robust financial plan:
          </Typography>
        </Stack>

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
                  {value.year}
                </Typography>

                <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
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
