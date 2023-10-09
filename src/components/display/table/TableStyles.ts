import { filterClassName } from '@util/helpers/classFilter';
import { TableProps } from './Table';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: TableProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-table') {
    value += ' table';
  }

  if (!simple) {
    if (name === 'finallyreact-table__header-row') {
      value += ' table-row';
    }

    if (name === 'finallyreact-table__header-row_cell') {
      value += ' table-cell border-b-gray-3 padding-1/2';
    }

    if (name === 'finallyreact-table__row') {
      value += ' table-row';
    }

    if (name === 'finallyreact-table__row_cell') {
      value += ' table-cell border-b-gray-3 padding-1/2';
    }

    if (name === 'finallyreact-table__pagination') {
      value += ' flex';
    }
  }

  return filterClassName(value, custom);
}
