/**
 * Custom hook for responsive design utilities
 * Provides easy access to breakpoint information and responsive values
 */

import { useTheme, useMediaQuery } from '@mui/material';
import { RESPONSIVE_BREAKPOINTS } from '../constants/uiConstants';

/**
 * Hook that provides responsive breakpoint information
 */
export const useResponsive = () => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down(RESPONSIVE_BREAKPOINTS.MOBILE));
  const isTablet = useMediaQuery(theme.breakpoints.down(RESPONSIVE_BREAKPOINTS.TABLET));
  const isDesktop = useMediaQuery(theme.breakpoints.up(RESPONSIVE_BREAKPOINTS.DESKTOP));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up(RESPONSIVE_BREAKPOINTS.LARGE_SCREEN));
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    theme,
  };
};

/**
 * Hook that provides responsive values based on screen size
 */
export const useResponsiveValue = <T>(
  mobileValue: T,
  tabletValue: T,
  desktopValue: T,
  largeScreenValue?: T
) => {
  const { isMobile, isTablet, isLargeScreen } = useResponsive();
  
  if (isMobile) return mobileValue;
  if (isTablet) return tabletValue;
  if (isLargeScreen && largeScreenValue !== undefined) return largeScreenValue;
  return desktopValue;
};

/**
 * Hook that provides responsive spacing values
 */
export const useResponsiveSpacing = () => {
  return useResponsiveValue(
    { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 3 },
    { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
    { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
    { xs: 2.5, sm: 3, md: 3.5, lg: 4, xl: 4.5 }
  );
};
