import { filterClassName } from '@util/helpers/classFilter';
import { RowProps } from './Row';

export function getClassName({
  name,
  props,
  custom,
  simple
}: {
  name: string;
  props: RowProps;
  custom?: string;
  simple?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-row' && !simple) {
    value += ' flex flex-row flex-wrap';
  }

  if (props.verticalAlign) {
    value += ' flex flex-row flex-wrap';

    if (props.verticalAlign === 'top') {
      value += ' align-start';
    } else if (props.verticalAlign === 'center') {
      value += ' align-center';
    } else if (props.verticalAlign === 'bottom') {
      value += ' align-end';
    }
  }

  if (props.horizontalAlign) {
    value += ' flex flex-row flex-wrap';
  }

  if (props.horizontalAlign === 'left') {
    value += ' justify-start';
  } else if (props.horizontalAlign === 'center') {
    value += ' justify-center';
  } else if (props.horizontalAlign === 'right') {
    value += ' justify-end';
  }

  return filterClassName(value, custom);
}
