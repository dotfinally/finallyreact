import { LoadingProps } from './Loading';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: LoadingProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-loading__icon') {
    if (!simple) {
      value += ' inline-block border-2 border-t-transparent rounded-1/2 content-empty h-2 w-2 will-change-transform';

      if (props.rainbow) {
        value += ' spinning-rainbow';
      } else {
        value += ' spinning';
      }
    }
  }

  if (!props.rainbow) {
    if (props.color) {
      value += ' border-' + props.color;
    } else {
      value += ' border-black';
    }
  }

  return filterClassName(value, custom);
}
