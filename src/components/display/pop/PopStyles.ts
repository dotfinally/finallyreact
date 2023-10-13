import { filterClassName } from '@util/helpers/classFilter';
import { PopWrapperProps } from './Pop';

export function getClassName({
  name,
  props,
  simple,
  showArrow,
  custom
}: {
  name: string;
  props: PopWrapperProps;
  simple: boolean;
  showArrow?: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-pop') {
    value += ' relative inline-block';
  }

  if (name === 'finallyreact-pop__display') {
    value += ' rounded-1/5 absolute z-120 w-max-content';

    if (props.showArrow !== false) {
      value +=
        ' after-empty after-absolute after-border-width-25 after-border-solid after:border-r-transparent after:border-l-transparent after:border-b-transparent';
    }

    if (!simple && !props.customDisplay) {
      value += ' black-bg white py-1/4 px-1/2 after:border-t-black';
    }
  }

  if (name === 'finallyreact-pop__top') {
    value += ' bottom-110';

    if (props.showArrow !== false) {
      value += ' after-border-t-transparent after-top-100 after-left-50 after-margin-left-negative-25';
    }
  }

  if (name === 'finallyreact-pop__right') {
    value += ' left-110';

    if (props.showArrow !== false) {
      value += ' after-top-50 after-right-100 after-margin-top-negative-25 after-transform-rotate-90';
    }
  }

  if (name === 'finallyreact-pop__bottom') {
    value += ' top-110 ';

    if (props.showArrow !== false) {
      value += ' after-bottom-100 after-left-50 after-margin-left-negative-25 after-transform-rotate-180';
    }
  }

  if (name === 'finallyreact-pop__left') {
    value += ' right-110 ';

    if (props.showArrow !== false) {
      value += ' after-top-50 after-left-100 after-margin-top-negative-25 after-transform-rotate-270';
    }
  }

  return filterClassName(value, custom);
}
