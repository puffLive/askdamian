import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useResponsive } from "src/hooks/use-responsive";

import Image from "src/components/image";

// ----------------------------------------------------------------------

const BENEFITS = [
  {
    title: "Personalized Financial Planning",
    description:
      "At Legacy Wealth Advisory, we provide personalized financial planning tailored to your unique retirement goals and financial situation. Our team of expert advisors will work with you to create a comprehensive plan that aligns with your long-term objectives.",
    iconColor: "primary",
  },
  {
    title: "Investment Expertise",
    description:
      "Our experienced advisors have a deep understanding of the investment landscape and can help optimize the performance of your pension fund. By transferring your pension to us, you gain access to our expertise in managing and growing your retirement savings.",
    iconColor: "success",
  },
  {
    title: "Diversified Investment Strategies",
    description:
      "We offer a range of diversified investment strategies to minimize risk and maximize returns. Our approach includes a mix of asset classes tailored to your risk tolerance and retirement timeline, ensuring a balanced and robust portfolio.",
    iconColor: "secondary",
  },
  {
    title: "Adjustments",
    description:
      "Retirement planning is not a one-time event. We continuously monitor your pension investments and make necessary adjustments to keep your plan on track. Our proactive approach ensures that your retirement savings are well-managed and aligned with changing market conditions and personal circumstances.",
    iconColor: "secondary",
  },
  {
    title: "Tax Efficiency",
    description:
      "Our advisors are well-versed in the complexities of tax laws related to pensions. We can help you structure your pension transfers and withdrawals in a tax-efficient manner, potentially saving you money and maximizing your retirement income.",
    iconColor: "success",
  },
  {
    title: "Transparent Fees and Reporting",
    description:
      "At Legacy Wealth Advisory, we pride ourselves on transparency. Our fee structure is straightforward, and we provide regular, detailed reports on the performance of your pension investments, so you always know how your retirement savings are progressing.",
    iconColor: "primary",
  },
];

// ----------------------------------------------------------------------

export default function MarketingServicesBenefits() {
  const mdUp = useResponsive("up", "md");

  return (
    <Box
      sx={{
        bgcolor: "background.neutral",
        py: { xs: 10, md: 15 },
      }}
      id="pension"
    >
      <Container>
        <Typography variant="h2" sx={{ textAlign: "center", mt: 15 }}>
          Understanding Pensions
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
          A pension is a retirement savings plan that provides individuals with
          income during their retirement years. It is typically funded by both
          the employer and the employee throughout the employee's working life.
        </Typography>

        <Box
          sx={{
            display: "grid",
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            gridTemplateColumns: { md: "repeat(3, 1fr)" },
          }}
        >
          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(0, 3).map((benefit, index) => (
              <BenefitItem
                key={benefit.title}
                benefit={benefit}
                index={index}
                reverse
              />
            ))}
          </Stack>

          {mdUp && (
            <Image
              alt="benefits"
              src="/assets/illustrations/illustration_benefits.svg"
            />
          )}

          <Stack spacing={{ xs: 4, md: 10 }}>
            {BENEFITS.slice(-3).map((benefit, index) => (
              <BenefitItem
                key={benefit.title}
                benefit={benefit}
                index={index}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function BenefitItem({ benefit, reverse, index }) {
  const { title, description, iconColor } = benefit;

  return (
    <Stack
      spacing={1}
      direction={{ xs: "row", md: reverse ? "row-reverse" : "row" }}
      sx={{
        ...(reverse && {
          textAlign: { md: "right" },
        }),
        ...(index === 1 && {
          pl: { md: 6 },
          ...(reverse && {
            pl: { md: 0 },
            pr: { md: 6 },
          }),
        }),
      }}
    >
      <Box
        sx={{
          m: 1,
          width: 16,
          height: 16,
          flexShrink: 0,
          borderRadius: "50%",
          background: (theme) =>
            `linear-gradient(to bottom, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          ...(iconColor === "secondary" && {
            background: (theme) =>
              `linear-gradient(to bottom, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
          }),
          ...(iconColor === "success" && {
            background: (theme) =>
              `linear-gradient(to bottom, ${theme.palette.success.light}, ${theme.palette.success.main})`,
          }),
        }}
      />

      <Stack spacing={1}>
        <Typography variant="h5">{title}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}

BenefitItem.propTypes = {
  benefit: PropTypes.shape({
    description: PropTypes.string,
    iconColor: PropTypes.string,
    title: PropTypes.string,
  }),
  index: PropTypes.number,
  reverse: PropTypes.bool,
};
