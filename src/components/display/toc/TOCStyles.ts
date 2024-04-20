import { TableOfContentsProps } from './TOC';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: TableOfContentsProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (!simple) {
    if (name === 'finallyreact-toc') {
      value += ' text unset black'
    }

    if (name === 'finallyreact-toc__h1') {
      value += ' text-md mt-1/2 bold hover:ocean-8 hover:underline pointer'
    }

    if (name === 'finallyreact-toc__h2') {
      value += ' semibold ml-1/2 mt-1/2 hover:ocean-8 hover:underline pointer'
    }

    if (name === 'finallyreact-toc__h3') {
      value += ' ml-1 mt-1/2 hover:ocean-8 hover:underline pointer'
    }

    if (name === 'finallyreact-toc__h4') {
      value += ' ml-1-1/2 mt-1/2 hover:ocean-8 hover:underline pointer'
    }

    if (name === 'finallyreact-toc__h5') {
      value += ' ml-2 mt-1/2 hover:ocean-8 hover:underline pointer'
    }

    if (name === 'finallyreact-toc__h6') {
      value += ' ml-2-1/2 mt-1/2 hover:ocean-8 hover:underline pointer'
    }
  }

  return filterClassName(value, custom);
}
