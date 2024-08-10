// Emit a custom change event (mainly for the Form component)
export function dispatchChangeEvent(value: any, name?: string, id?: string) {
  const customEvent = new CustomEvent('change', {
    detail: {
      name,
      id,
      value
    }
  });
  document.dispatchEvent(customEvent);
}

export function dispatchSubmitEvent(name?: string, id?: string) {
  const customEvent = new CustomEvent('submit', {
    detail: {
      name,
      id
    }
  });
  document.dispatchEvent(customEvent);
}

export function dispatchCompositionEvent(value: any, name?: string, id?: string) {
  const customEvent = new CustomEvent('compositionend', {
    detail: {
      name,
      id,
      value
    }
  });
  document.dispatchEvent(customEvent);
}