import { filterClassName } from '@util/helpers/classFilter';
import { AccordionGroupProps } from './AccordionGroup';

export function getClassName({ name, props, custom }: { name: string; props: AccordionGroupProps; custom?: string }) {
  let value = name;

  if (name === 'finallyreact-accordion-group') {
    value += ' block';
  }

  return filterClassName(value, custom);
}
