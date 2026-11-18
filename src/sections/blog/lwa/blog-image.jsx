import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";

import Image from "src/components/image";

// ----------------------------------------------------------------------

// The article's featured image, or a branded panel with the elephant logo
// when the article has no image.
export default function BlogImage({ post, ratio = "16/9", sx }) {
  const theme = useTheme();

  if (post.image) {
    return <Image src={post.image} alt={post.imageAlt} ratio={ratio} sx={sx} />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: 1,
        pt: ratio === "16/9" ? "56.25%" : "42.85%",
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        ...sx,
      }}
    >
      <Box
        sx={{
          inset: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
          color: alpha(theme.palette.common.white, 0.9),
        }}
      >
        <Box
          component="img"
          src="/assets/legacy-images/lwa-logo-192x192.png"
          alt=""
          sx={{ width: 72, height: 72 }}
        />
        <Box
          component="span"
          sx={{ typography: "overline", color: "primary.lighter" }}
        >
          {post.category}
        </Box>
      </Box>
    </Box>
  );
}

BlogImage.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};
