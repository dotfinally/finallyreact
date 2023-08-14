import { CardProps } from './Card';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: CardProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-card') {
    if (props.shadow) {
      value += ' box-shadow';

      if (props.showHoverShadow) {
        value += ' hover:box-shadow-dark';
      }
    }

    if (props.well) {
      value += ' box-shadow-inset';

      if (props.showHoverShadow) {
        value += ' hover:box-shadow-inset-dark';
      }
    }

    if (props.rounded) {
      value += 'rounded-1';
    }

    if (!simple) {
      value += ' border-1 border-stone-8';
    }
  }

  if (name === 'finallyreact-card__header') {
    if (!simple) {
      value += ' p-1 border-b-1 border-b-stone-8';
    }
  }

  if (name === 'finallyreact-card__header_title') {
    if (!simple) {
      value += ' m-0 text-md bold';
    }
  }

  return filterClassName(value, custom);
}
