import { SxStyleProp } from 'theme-ui';

/** A simple keyframe animation to fade in an element. */
export const fadeIn: SxStyleProp = {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  }
}

/** A simple keyframe animation to fade out an element. */
export const fadeOut: SxStyleProp = {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  }
}