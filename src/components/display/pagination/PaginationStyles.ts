import { filterClassName } from '@util/helpers/classFilter';
import { PaginationProps } from './Pagination';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: PaginationProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-pagination') {
    value += ' flex';
  }

  if (!simple) {
    if (name === 'finallyreact-pagination__arrow-container') {
      if (props.disabled || props.readOnly) {
        value += ' cursor-default';
      }
    }

    if (name === 'finallyreact-pagination__page') {
      if (props.disabled || props.readOnly) {
        value += ' cursor-default';
      }
    }

    if (name.includes('finallyreact-pagination__page')) {
      value += ' border-1 border-stone-8 cursor-pointer min-w-4/5 p-4/5 center hover:white hover:stone-8-bg';
    }

    if (name === 'finallyreact-pagination__page-active') {
      value += ' ocean-7-bg border-ocean-7 white bold';
    }

    if (name === 'finallyreact-pagination__container-arrow') {
      value += ' w-inherit h-inherit cursor-pointer';
    }

    if (name.includes('finallyreact-pagination__arrow')) {
      value +=
        ' border-black border-t-0 border-r-2 border-b-2 border-l-0 h-4/5 mt-1 transition-transform-2-ease-quick vertical-align-middle w-4/5';
    }

    if (name === 'finallyreact-pagination__arrow-left') {
      value += ' mr-1/2 ml-1 rotate-135';
    }

    if (name === 'finallyreact-pagination__arrow-right') {
      value += ' ml-1/2 mr-1 -rotate-45';
    }

    if (name === 'finallyreact-pagination__size-dropdown') {
      value += ' mt-1/2 ml-1';
    }
  }

  return filterClassName(value, custom);
}
