import { ScrollTopProps } from './ScrollTop';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  custom,
  visible,
  isHover
}: {
  name: string;
  props: ScrollTopProps;
  simple: boolean;
  custom?: string;
  visible?: boolean;
  isHover?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-scroll-top') {
    if (!simple) {
      value += ' fixed z-999 m-1/2 pointer';
    }

    if (visible) {
      if (isHover) {
        value += ' opacity-100';
      } else {
        value += ' opacity-50';
      }
    } else {
      value += ' opacity-0';
    }
  }

  return filterClassName(value, custom);
}
