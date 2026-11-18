import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export default function BlogDisclaimer() {
  return (
    <Box
      component="aside"
      aria-label="Important information"
      sx={{
        p: 3,
        borderRadius: 2,
        borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
        bgcolor: "background.neutral",
      }}
    >
      <Typography variant="subtitle2" component="h2" gutterBottom>
        Important information
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        This article is for general educational purposes only and is not
        personalized financial, investment, tax, legal or insurance advice. Tax
        rules, contribution limits, government benefits and program eligibility
        change over time and depend on your circumstances. Past performance does
        not guarantee future results, and insurance coverage is subject to the
        terms of each policy. Please speak with a qualified professional about
        your own situation before making decisions.
      </Typography>
    </Box>
  );
}
