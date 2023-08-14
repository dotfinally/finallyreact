import { filterClassName } from '@util/helpers/classFilter';
import { TabsProps } from './Tabs';

export function getClassName({
  name,
  props,
  simple,
  custom,
  isActive
}: {
  name: string;
  props: TabsProps;
  simple: boolean;
  custom?: string;
  isActive?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-tabs') {
    value += ' w-full';
  }

  if (!simple) {
    if (name === 'finallyreact-tabs__tab') {
      if (props.disabled) {
        value += ' not-allowed';
      }
    }

    if (name === 'finallyreact-tabs__header') {
      value += ' flex';
    }

    if (name === 'finallyreact-tabs__tab') {
      value += ' pointer p-1/2';

      if (isActive) {
        value += ' border-b-ocean-7 border-b-2';
      }
    }
  }

  if (value === 'finallyreact-tabs__content') {
    value += ' w-full';
  }

  if (value === 'finallyreact-tabs__tab-content') {
    if (isActive) {
      value += ' block';
    } else {
      value += ' none';
    }
  }

  return filterClassName(value, custom);
}
