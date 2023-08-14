import { useCallback, useState, useRef, Ref } from 'react';
import { useDocumentEvent } from './useDocumentEvent';

/**
 * Functions which performs a click outside event listener for display popovers, like Dropdowns, modals, etc.
 * @param {*} initialState initialState of the component
 * @param {*} onAfterClose some extra function call to do after closing component
 */
export function usePopover(
  initialState: boolean,
  onAfterClose?: () => void
): [Ref<any>, boolean, (value: boolean) => void] {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(initialState || false);

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
      onAfterClose?.();
    },
    [ref, onAfterClose]
  );

  // close popover when clicking the escape key
  const handleHidePopover = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onAfterClose?.();
      }
    },
    [onAfterClose]
  );

  useDocumentEvent([
    { type: 'click', callback: handleClickOutside },
    { type: 'keydown', callback: handleHidePopover }
  ]);

  return [ref, isOpen, setIsOpen];
}
