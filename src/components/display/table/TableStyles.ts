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
  const isMobile = props.isMobile;

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
      if (props.isMobile) {
        value += ' p-1 block'
      } else {
        value += ' table-row';
      }
    }

    if (name === 'finallyreact-table__row_cell') {
      if (props.isMobile) {
        value += ' flex';
      } else {
        value += ' table-cell border-b-gray-3 padding-1/2';
      }
      
    }

    if (name === 'finallyreact-table__pagination') {
      value += ' flex';
    }

    if (name === 'finallyreact-mobile-row__key') {
      value += ' bold mr-1/2';
    }
  }

  if (name === 'finallyreact-table__header-row_cell-sort-asc' || name === 'finallyreact-table__header-row_cell-sort-desc') {
    value += ' w-2 h-2'
  }

  if (name === 'finallyreact-table__header-row_cell-content') {
    value += ' flex align-center';
  }

  return filterClassName(value, custom);
}
