import { animationTypes } from './types'

export const animations: { [key in animationTypes]: object } = {
  'fade-in-bottom': {
    from: { transform: 'translateY(100%)', opacity: 0 },
    to: { transform: 'translateY(0%)', opacity: 1 },
  },
  'fade-in-top': {
    from: { transform: 'translateY(-100%)', opacity: 0 },
    to: { transform: 'translateY(0%)', opacity: 1 },
  },
  'fade-in-left': {
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 },
  },
  'fade-in-right': {
    from: { transform: 'translateX(100%)', opacity: 0 },
    to: { transform: 'translateX(0%)', opacity: 1 },
  },
}
