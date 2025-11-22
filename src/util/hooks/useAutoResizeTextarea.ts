import { useEffect, useRef } from 'react';

export function useAutoResizeTextarea(value) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resize = () => {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    };

    resize();
    el.addEventListener('input', resize, { passive: true });
    return () => el.removeEventListener('input', resize);
  }, []);

  // run when initial/updated value changes
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return ref;
}
