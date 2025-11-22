import { filterClassName } from '@util/helpers/classFilter';
import { SliderProps } from './Slider';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: SliderProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-slider') {
    if (!simple) {
      if (props.disabled || props.readOnly) {
        value += ' cursor-not-allowed';
      } else {
        value += ' cursor-pointer';
      }
    }
  }

  return filterClassName(value, custom);
}
