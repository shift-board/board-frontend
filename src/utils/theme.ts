/**
 * The theme used throughout the app.
 * 
 * For example:
 * ```
 * const style: SxStyleProp = {
 *   font: 'body', //will compile into 'Open Sans'
 * };
 * ```
 */
export const theme = {
  fonts: {
    body: 'Open Sans',
  },
  colors: {
    primary: '#323657',
    contrast: '#EE923D',
    overlay: '#F8F8F8',
    secondaryOverlay: '#E5E6EF59',
    text: {
      primary: '#000000DE',
      bold: '#323657DE'
    },
    dropshadow: '#00000040',
  },
  fontSizes: {
    mini: 10,
    small: 14,
    medium: 16,
    large: 18,
    larger: 20,
    largest: 24,
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