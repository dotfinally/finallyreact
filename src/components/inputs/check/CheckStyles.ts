import { filterClassName } from '@util/helpers/classFilter';
import { CheckProps } from './Check';

export function getClassName({
  name,
  props,
  simple,
  custom,
  size,
  checked
}: {
  name: string;
  props: CheckProps;
  simple: boolean;
  custom?: string;
  size?: string;
  checked?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-check') {
    value += ' flex';

    if (props.disabled) {
      value += ' cursor-not-allowed';
    } else {
      value += ' cursor-pointer';
    }
  }

  if (props.disabled) {
    if (name === 'finallyreact-check__input' && !props.toggle) {
      value += ' cursor-not-allowed border-stone-4 stone-2-bg';
    }

    if (name === 'finallyreact-check__label') {
      value += ' cursor-not-allowed opacity-50';
    }

    if (name === 'finallyreact-toggle') {
      value += ' cursor-not-allowed opacity-50';
    }

    if (name === 'finallyreact-check__input' && props.toggle && size === 'md') {
      value += ' cursor-not-allowed';

      if (props.checked) {
        value += ' left-1-1/2';
      }
    }

    if (name === 'finallyreact-check__checkmark' && props.toggle) {
      value += ' opacity-1';
    }
  }

  if (props.toggle) {
    if (name === 'finallyreact-toggle__input') {
      value += ' border-2 m-r-1/10';
      value += ` border-${props.color || 'black'} ${props.color || 'black'}`;

      if (size === 'sm') {
        value += ' w-2-1/5 h-1';
      }

      if (size === 'md') {
        value += ' w-2-4/5 h-1-1/4';
      }

      if (size === 'lg') {
        value += ' w-3-2/5 h-1-1/2';
      }
    }

    if (name === 'finallyreact-toggle__x') {
      value += ' absolute transition-3-ease-all';

      if (size === 'sm') {
        value += ' w-1 -mt-4/5';
      }

      if (size === 'md') {
        value += ' w-1-1/4 -mt-3/5';
      }

      if (size === 'lg') {
        value += ' w-1-2/5 -mt-1/2';
      }
    }

    if (name === 'finallyreact-check__input') {
      value += ' transition-3-ease-all relative after-empty bottom-1/10';

      if (size === 'sm') {
        if (checked) {
          value += ' left-1';
        } else {
          value += ' -left-1/10';
        }
      }

      if (size === 'md') {
        if (checked) {
          value += ' left-1-2/5';
        } else {
          value += ' -left-1/10';
        }
      }

      if (size === 'lg') {
        if (checked) {
          value += ' left-1-4/5';
        } else {
          value += ' -left-1/10';
        }
      }
    }

    if (name === 'finallyreact-check__label') {
      value += ' pt-0';
    }
  }

  if (name === 'finallyreact-check__input') {
    value += ' pointer border-2 inline-block transition-transform-1-ease-in-out';
    value += ` border-${props.color || 'black'}`;

    if ((props.fill || props.toggle) && checked) {
      value += ` ${props.color || 'black'}-bg`;
    }

    if (props.disabled) {
      value += ' cursor-not-allowed opacity-50';
    }

    if (size === 'sm') {
      value += ' w-1 h-1';
    }

    if (size === 'md') {
      value += ' w-1-1/4 h-1-1/4';
    }

    if (size === 'lg') {
      value += ' w-1-1/2 h-1-1/2';
    }
  }

  if (name === 'finallyreact-check__checkmark') {
    value += ' transition-transform-1-ease-in-out inline-block relative rotate-40';

    let checkColor = props.checkColor || props.color;
    if (props.disabled && !checkColor) {
      checkColor = 'white';
    }
    value += ` border-${checkColor || 'black'}`;

    if (size === 'sm') {
      value += ' border-b-2 border-r-2 w-3/10 h-4/5 left-3/10 bottom-1/5';
    }

    if (size === 'md') {
      value += ' border-b-4 border-r-4 w-2/5 h-4/5 left-3/10';
    }

    if (size === 'lg') {
      value += ' border-b-5 border-r-5 w-1/2 h-1-1/10 left-2/5 bottom-1/10';
    }

    if (checked) {
      value += ' opacity-100';
    } else {
      value += ' opacity-0';
    }
  }

  if (name === 'finallyreact-check__label') {
    value += ' pointer ml-1/5';

    if (size === 'sm') {
      value += ' pt-1/10 text-sm';
    }

    if (size === 'md') {
      value += ' pt-1/10 text';
    }

    if (size === 'lg') {
      value += ' text-md';
    }
  }

  return filterClassName(value, custom);
}
