import { filterClassName } from '@util/helpers/classFilter';
import { RadioProps } from './Radio';

export function getClassName({
  name,
  props,
  simple,
  custom,
  disabled,
  size = 'md',
  checked
}: {
  name: string;
  props: RadioProps;
  simple: boolean;
  custom?: string;
  disabled?: boolean;
  size?: string;
  checked?: boolean;
}) {
  let value = name;

  if (!simple) {
    if (!disabled) {
      if (name === 'finallyreact-radio__option') {
        if (props.disabled || props.readOnly) {
          value += ' cursor-default';
        } else {
          value += ' cursor-pointer';
        }
      }

      if (name === 'finallyreact-radio__input') {
        if (props.disabled || props.readOnly) {
          value += ' cursor-default';
        } else {
          value += ' cursor-pointer';
        }
      }
    } else {
      if (name === 'finallyreact-radio__option') {
        value += 'cursor-default';
      }

      if (name === 'finallyreact-radio__input') {
        value += 'cursor-default';
      }

      if (name === 'finallyreact-radio__label') {
        value += ' opacity-50';
      }
    }

    if (name === 'finallyreact-radio__option') {
      value += ' mb-1/2 flex';

      if (disabled) {
        value += ' cursor-default';
      }
    }

    if (size === 'sm') {
      if (name === 'finallyreact-radio__input') {
        value += ' h-3/4 w-3/4 radio-sm-after';
      }

      if (name === 'finallyreact-radio__label') {
        value += ' text-sm';
      }
    }

    if (size === 'md') {
      if (name === 'finallyreact-radio__input') {
        value += ' h-1 w-1 radio-md-after';
      }

      if (name === 'finallyreact-radio__label') {
        value += ' text';
      }
    }

    if (size === 'lg') {
      if (name === 'finallyreact-radio__input') {
        value += ' h-1-1/2 w-1-1/2 radio-lg-after';
      }

      if (name === 'finallyreact-radio__label') {
        value += ' text-lg';
      }
    }

    if (name === 'finallyreact-radio__input') {
      value += ' rounded-1 border-solid border-1 inline-block relative radio-after';

      const color = props.color || 'black';
      const borderColor = `border-${props.color || 'black'}`;
      value += ` ${borderColor} ${color}`;

      if (checked) {
        value += ` after:${color}-bg`;
      }
    }

    if (name === 'finallyreact-radio__label') {
      value += ' pl-3/10';

      if (size === 'lg') {
        value += ' -mt-1/5';
      } else {
        value += ' -mt-1/10';
      }
    }
  }

  return filterClassName(value, custom);
}
