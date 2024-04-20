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
      value += ' h-2 w-2 inline-block rounded-1/2 border-t-3 border-l-3 border-r-3 border-r-transparent border-box';

      if (props.rainbow) {
        value += ' spinning-rainbow';
      } else {
        value += ' spinning';
      }
    }
  }

  if (!props.rainbow) {
    if (props.color) {
      value += ' border-t-' + props.color + ' border-l-' + props.color;
    } else {
      value += ' border-t-black border-l-black';
    }
  }

  return filterClassName(value, custom);
}
