import { useState, useEffect } from 'react';
import { getBreakpoint } from '../helpers/getBreakpoint';
import { debounce } from '../helpers/debounce';

export function useWindowSize() {
  const [size, setSize] = useState<[number, number, string, boolean]>([0, 0, '', true]);

  useEffect(() => {
    function resize() {
      const screenSize = getBreakpoint();
      const isMobile = screenSize === 'xs';
      setSize([window?.innerWidth, window?.innerHeight, screenSize, isMobile]);
    }
    const debouncedResize = debounce(resize, 100);

    window?.addEventListener('resize', debouncedResize);

    resize();

    return () => window?.removeEventListener('resize', debouncedResize);
  }, []);

  return size;
}
