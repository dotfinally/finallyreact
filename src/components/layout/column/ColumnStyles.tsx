import { filterClassName } from '@util/helpers/classFilter';
import { ColumnProps } from './Column';

export function getClassName({ name, props, custom }: { name: string; props: ColumnProps; custom?: string }) {
  let value = name;

  if (props.verticalAlign === 'top') {
    value += ' flex align-start';
  }
  if (props.verticalAlign === 'center') {
    value += ' flex align-center';
  }
  if (props.verticalAlign === 'bottom') {
    value += ' flex align-end';
  }

  if (props.horizontalAlign === 'left') {
    value += ' flex justify-start';
  }
  if (props.horizontalAlign === 'center') {
    value += ' flex justify-center';
  }
  if (props.horizontalAlign === 'right') {
    value += ' flex justify-end';
  }

  return filterClassName(value, custom);
}
