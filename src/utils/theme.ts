/**
 * The theme used throughout the app.
 * 
 * For example:
 * ```
 * const style: SxStyleProp = {
 *   fontFamily: 'body', //will compile into 'Open Sans'
 * };
 * ```
 */
export const theme = {
  fonts: {
    body: 'Open Sans',
  },
  colors: {
    primary: '#323657',
    secondary: '#828BD7',
    accent: '#EE923D',
    contrast: '#FFFFFF',
    overlay: '#EDEDED',
    background: '#F0F0F0',
    secondaryOverlay: '#E5E6EF59',
    text: {
      primary: '#000000DE',
      themed: '#323657DE',
      contrast: '#FFFFFFDE',
    },
    cardBg: '#FFFFFF',
    dropshadow: '#00000040',
  },
  bodyWrapper: {
    mt: [0, '54px'],
    mb: ['54px', 0],
  },
  fontSizes: {
    mini: 10,
    small: 14,
    medium: 16,
    large: 18,
    larger: 20,
    largest: 24,
    title: 50,
  },
  fontWeight: {
    body: 'normal',
  },
  lineHeights: {
    body: 1.5,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
};