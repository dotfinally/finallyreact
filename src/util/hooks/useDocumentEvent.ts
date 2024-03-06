import { RefCallback, useEffect } from 'react';

// hook to add and remove event listeners for an array of events
export function useDocumentEvent(events: { type: string; callback: RefCallback<any> }[]) {
  useEffect(() => {
    events?.forEach((event) => {
      if (event) {
        document.addEventListener(event.type, event.callback);
      }
    });

    return () =>
      events?.forEach((event) => {
        if (event) {
          document.removeEventListener(event.type, event.callback);
        }
      });
  }, [events]);
}
