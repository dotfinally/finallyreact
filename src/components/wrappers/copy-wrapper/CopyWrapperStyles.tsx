import { filterClassName } from '@util/helpers/classFilter';
import { CopyWrapperProps } from './CopyWrapper';

export function getClassName({
  name,
  props,
  custom,
  simple,
  show,
  location
}: {
  name: string;
  props: CopyWrapperProps;
  custom?: string;
  simple?: boolean;
  show?: boolean;
  location?: string;
}) {
  let value = name;

  if (name === 'finallyreact-copy-wrapper') {
    value += ' flex';
  }

  if (name === 'finallyreact-copy-pop__default-tooltip') {
    value += ' black-bg white py-1/4 px-1/2 mx-1/4 after:border-t-transparent';
  }

  if (!simple) {
    if (name === 'finallyreact-copy-pop') {
      if (location === 'top-right') {
        value += ' right-1/10';
      }

      if (location === 'top-left') {
        value += ' left-1';
      }

      if (location === 'bottom-right') {
        value += ' left-1 finallyreact-copy-wrapper-top-margin';
      }

      if (location === 'bottom-left') {
        value += ' right-1/10 finallyreact-copy-wrapper-top-margin';
      }
    }
  }

  if (name === 'finallyreact-copy-icon') {
    value += ` ${props.color || 'black'}`;
  }

  return filterClassName(value, custom);
}
