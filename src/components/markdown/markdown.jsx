import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import StyledMarkdown from './styles';

// ----------------------------------------------------------------------

export default function Markdown({ content, firstLetter = false, sx }) {
  const sanitizedContent = DOMPurify.sanitize(content || '');
  
  return (
    <StyledMarkdown
      firstLetter={firstLetter}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      sx={sx}
    />
  );
}

Markdown.propTypes = {
  content: PropTypes.string,
  firstLetter: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Markdown.defaultProps = {
  content: '',
  firstLetter: false,
  sx: {},
};
