import { filterClassName } from '@util/helpers/classFilter';
import { IconWrapperProps } from './IconWrapper';

export function getClassName({
  name,
  props,
  custom,
  simple,
  location
}: {
  name: string;
  props: IconWrapperProps;
  custom?: string;
  simple?: boolean;
  location?: string;
}) {
  let value = name;

  if (name === 'finallyreact-icon-wrapper') {
    value += ' flex';
  }

  if (name === 'finallyreact-icon_top') {
    value += ' flex flex-row flex-wrap align-start';
  }

  if (name === 'finallyreact-icon_bottom') {
    value += ' flex flex-row flex-wrap align-end';
  }

  return filterClassName(value, custom);
}
