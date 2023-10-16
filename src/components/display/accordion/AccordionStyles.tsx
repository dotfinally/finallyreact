import { AccordionProps } from './Accordion';

export function getClassName({
  name,
  props,
  simple,
  open,
  custom
}: {
  name: string;
  props: AccordionProps;
  simple: boolean;
  open: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-accordion') {
    value += ' w-full';

    if (props.rounded) {
      value += ' rounded';
    }
    if (open) {
      value += ' open';
    }
    if (props.disabled) {
      value += ' disabled';
    }
  }

  if (name === 'finallyreact-accordion__header') {
    value += ' align-center';

    if (props.rounded) {
      if (open) {
        value += ' rounded-b-0 rounded-t-1';
      } else {
        value += ' rounded-1';
      }
    }

    if (!simple) {
      if (props.disabled) {
        value += ' cursor-not-allowed';
      }

      value += ' cursor-pointer flex justify-content-between border-1 border-black p-1';
    }
  }

  if (name === 'finallyreact-accordion__content') {
    if (props.rounded) {
      value += ' border-t-1';
    }

    if (simple) {
      if (open) {
        value += ' block';
      } else {
        value += ' none';
      }
    } else {
      value += ' border-1 border-black';

      if (open) {
        value += ' block';
      } else {
        value += ' none';
      }
    }
  }

  if (name === 'finallyreact-accordion__header_arrow') {
    if (!simple) {
      value += ' border-r-2 border-b-2 w-1/2 h-1/2 vertical-align-middle transition-transform-2-ease-quick mt-1/3';
    }

    if (open) {
      value += ' rotate-45';
    } else {
      value += ' -rotate-45';
    }
  }

  if (name === 'finallyreact-accordion__content_text') {
    if (!simple) {
      value += ' p-1';
    }
  }

  return custom ? `${value} ${custom}` : value;
}
