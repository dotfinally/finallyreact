import { useEffect, useRef } from 'react';

export function useAutoResizeTextarea() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resize = () => {
      el.style.height = 'auto'; // allow shrink
      el.style.height = `${el.scrollHeight}px`; // expand to fit
    };

    // initialize for prefilled value
    resize();

    // handle input events
    el.addEventListener('input', resize, { passive: true });

    // cleanup
    return () => {
      el.removeEventListener('input', resize);
    };
  }, []);

  return ref;
}
