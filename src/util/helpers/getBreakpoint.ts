import { getFinallyConfig } from './getFinallyConfig';

// Determine screen size based on breakpoint
export function getBreakpoint() {
  const width = window?.innerWidth;
  const config = getFinallyConfig();
  const breakpoints = config.breakpoints;

  if (width < breakpoints.xs) {
    return 'xs';
  } else if (width < breakpoints.sm) {
    return 'sm';
  } else if (width < breakpoints.md) {
    return 'md';
  } else if (width < breakpoints.lg) {
    return 'lg';
  } else if (width < breakpoints.xl) {
    return 'xl';
  }

  return 'xxl';
}
