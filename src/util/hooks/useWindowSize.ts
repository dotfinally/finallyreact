import { useState, useEffect } from 'react';
import { getBreakpoint } from '../helpers/getBreakpoint';
import { debounce } from '../helpers/debounce';

export function useWindowSize() {
  const [size, setSize] = useState<{
    windowWidth: number;
    windowHeight: number;
    screenSize: string;
    isMobile: boolean;
  }>({
    windowWidth: 0,
    windowHeight: 0,
    screenSize: '',
    isMobile: true
  });

  useEffect(() => {
    function resize() {
      const screenSize = getBreakpoint();
      const isMobile = screenSize === 'xs' || screenSize === 'sm';

      setSize({
        windowWidth: window?.innerWidth,
        windowHeight: window?.innerHeight,
        screenSize,
        isMobile
      });
    }
    const debouncedResize = debounce(resize, 100);

    window?.addEventListener('resize', debouncedResize);

    resize();

    return () => window?.removeEventListener('resize', debouncedResize);
  }, []);

  return size;
}
