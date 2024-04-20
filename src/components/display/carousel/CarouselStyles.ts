import { CarouselProps } from './Carousel';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  custom,
  arrowDisabled
}: {
  name: string;
  props: CarouselProps;
  simple: boolean;
  custom?: string;
  arrowDisabled?: boolean;
}) {
  let value = name;

  if (!simple) {
    if (name === 'finallyreact-carousel_container') {
      value += ' flex';
    }

    if (name === 'finallyreact-carousel_arrow-left' || name === 'finallyreact-carousel_arrow-right') {
      if (!arrowDisabled) {
        value += ' pointer';
      }
    }

    if (name === 'finallyreact-carousel_content-container') {
      value += ' pt-1/2 flex gap-1';
    }

    if (arrowDisabled) {
      value += ' opacity-50';
    }
  }

  return filterClassName(value, custom);
}
