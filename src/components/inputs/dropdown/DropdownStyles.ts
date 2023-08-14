import { filterClassName } from '@util/helpers/classFilter';
import { DropdownProps } from './Dropdown';

export function getClassName({
  name,
  props,
  simple,
  custom,
  disabled,
  active
}: {
  name: string;
  props: DropdownProps;
  simple: boolean;
  custom?: string;
  disabled?: boolean;
  active?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-dropdown') {
    value += ' w-fit';

    if (props.select) {
      value += ' pointer';
    }
  }

  if (!simple) {
    if (name === 'finallyreact-dropdown__options-container') {
      value += ' border-t-0 border-r-1 border-b-1 border-l-1 absolute z-100';
      value += ` border-${props.color || 'black'}`;
    }

    if (name === 'finallyreact-dropdown__option') {
      value += ' pointer p-1/2 border-b-1';

      if (disabled) {
        value += ' cursor-not-allowed';
      } else {
        value += ' hover:gray-2-bg';
      }

      if (active) {
        value += ' gray-2-bg';
      } else {
        value += ' white-bg';
      }
    }
  }

  if (
    name === 'finallyreact-dropdown__select' ||
    name === 'finallyreact-input__box' ||
    name === 'finallyreact-dropdown__options-container'
  ) {
    if (props.size === 'sm') {
      value += ' w-4';
    } else if (props.size === 'lg') {
      value += ' w-10-3/5';
    } else {
      value += ' w-7-3/5';
    }
  }

  if (name === 'finallyreact-input__box') {
    if (props.color) {
      value += ` ${props.color}`;
    }
  }

  return filterClassName(value, custom);
}
