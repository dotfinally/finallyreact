import { filterClassName } from '@util/helpers/classFilter';
import { ButtonProps } from './Button';

export function getClassName({
  name,
  props,
  simple,
  additionalClasses,
  custom,
  size
}: {
  name: string;
  props: ButtonProps;
  simple: boolean;
  additionalClasses?: string;
  custom?: string;
  size?: string;
}) {
  let value = name;

  if (!simple) {
    if (name === 'finallyreact-button') {
      value += ' border-1 text';

      if (props.disabled || props.readOnly) {
        value += ' not-allowed opacity-50';
      } else {
        value += ' cursor-pointer';
      }
    }
  }

  if (size === 'sm') {
    value += ' py-1/2 px-1 text-sm';
  }

  if (size === 'md') {
    value += ' py-3/4 px-1-1/5 text';
  }

  if (size === 'lg') {
    value += ' p-1 text-lg';
  }

  if (props.rounded) {
    value += ' rounded-1';
  }

  let customClass = custom;
  if (additionalClasses) {
    customClass = `${customClass} ${additionalClasses}`;
  }

  return filterClassName(value, customClass);
}
