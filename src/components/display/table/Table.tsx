import React, { HTMLAttributes, useMemo, useCallback } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { Pagination, PaginationProps } from '../pagination/Pagination';
import { getClassName } from './TableStyles';

export interface TableProps extends HTMLAttributes<any> {
  columns: TableColumnProps[];
  headerRowCellProps?: HTMLAttributes<any>;
  headerRowProps?: HTMLAttributes<any>;
  paginationProps?: PaginationProps;
  rowCellProps?: HTMLAttributes<any>;
  rowProps?: HTMLAttributes<any>;
  rows: TableRowProps[];
  showPagination?: boolean;
  simple?: boolean;
  disabled?: boolean;
}

export interface TableColumnProps extends HTMLAttributes<any> {
  index: string | number;
  label?: any;
  headerCell?: (headerIndex: string | number, headerLabel: any) => React.ReactNode;
  rowCell?: (
    headerIndex: string | number,
    headerLabel: any,
    rowCellIndex: string | number,
    rowCellLabel: any
  ) => React.ReactNode;
}

export interface TableRowProps extends HTMLAttributes<any> {
  cells: RowCellProps[];
}

export interface RowCellProps extends HTMLAttributes<any> {
  index: string | number;
  label?: any;
  render?: (rowCellIndex: string | number, rowCellLabel: any) => React.ReactNode;
}

const omitValues = [
  'columns',
  'headerRowCellProps',
  'headerRowProps',
  'paginationProps',
  'rowCellProps',
  'rowProps',
  'rows',
  'showPagination',
  'simple',
  'disabled'
];
const omitColumnValues = ['index', 'label', 'headerCell', 'rowCell'];
const omitRowValues = ['cells'];
const omitRowCellValues = ['index', 'label', 'render'];

/**
 * Table component for displaying data in a tabular format
 * @param props TableProps
 */
export function Table(props: TableProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  if (!props.columns || !props.rows) {
    console.error('Table component requires columns and rows props');
    return null;
  }

  const headerRow = useMemo(() => {
    const headers = props.columns.map((column) => {
      let render;
      if (column.headerCell) {
        render = column.headerCell(column.index, column.label);
      } else {
        render = column.label;
      }

      return (
        <th
          {...(props.headerRowCellProps || {})}
          {...omit(column, omitColumnValues)}
          key={`finallyreact-table__header-row_cell-${column.index}`}
          className={getClassName({
            name: 'finallyreact-table__header-row_cell',
            props,
            simple,
            custom: `${column?.className} ${props.headerRowCellProps?.className}`
          })}
          role="columnheader"
          tabIndex={props.headerRowCellProps?.tabIndex || 0}
        >
          {render}
        </th>
      );
    });

    return (
      <tr
        {...(props.headerRowProps || {})}
        key="finallyreact-table__header-row"
        className={getClassName({
          name: 'finallyreact-table__header-row',
          props,
          simple,
          custom: props.headerRowProps?.className
        })}
        tabIndex={props.headerRowProps?.tabIndex || 0}
      >
        {headers}
      </tr>
    );
  }, [props.columns, props.headerRowCellProps, props.simple]);

  const rows = useMemo(() => {
    const rows = [];

    props.rows.forEach((row, index) => {
      const rowData = [];

      // loop through columns to ensure row data is in the same order as columns
      props.columns.forEach((column, index) => {
        let rowItem;
        if (column.index != null) {
          rowItem = row.cells.find((rowCell) => rowCell.index === column.index);
        } else {
          rowItem = row.cells[index];
        }

        let render;
        if (rowItem?.render) {
          render = rowItem.render(rowItem.index, rowItem.label);
        } else if (column.rowCell) {
          render = column.rowCell(column.index, column.label, rowItem?.index, rowItem?.label);
        } else {
          render = rowItem?.label;
        }

        rowData.push(
          <td
            {...(props.rowCellProps || {})}
            {...omit(rowItem, omitRowCellValues)}
            key={`finallyreact-table__row-${index}_cell-${column.index}`}
            className={getClassName({
              name: 'finallyreact-table__row_cell',
              props,
              simple,
              custom: `${rowItem?.className} ${props.rowCellProps?.className}`
            })}
            role="cell"
            tabIndex={props.rowCellProps?.tabIndex || 0}
          >
            {render}
          </td>
        );
      });

      rows.push(
        <tr
          {...(props.rowProps || {})}
          {...omit(row, omitRowValues)}
          className={getClassName({
            name: 'finallyreact-table__row',
            props,
            simple,
            custom: `${row?.className} ${props.rowProps?.className}`
          })}
          key={`finallyreact-table-row-${index}`}
          aria-rowindex={index + 1}
          aria-label={props.rowProps?.['aria-label'] || `Row ${index + 1}`}
          tabIndex={props.rowProps?.tabIndex || 0}
        >
          {rowData}
        </tr>
      );
    });

    return rows;
  }, [props.columns, props.rows, props.rowCellProps, props.simple]);

  return (
    <>
      <table
        {...omit(props, omitValues)}
        className={getClassName({
          name: 'finallyreact-table',
          props,
          simple,
          custom: props.className
        })}
        role={props.role || 'table'}
        tabIndex={props.tabIndex || 0}
        aria-label={props['aria-label'] || 'Table'}
        aria-disabled={props.disabled}
      >
        <thead>{headerRow}</thead>
        <tbody role="rowgroup">{rows}</tbody>
      </table>

      {props.showPagination && (
        <Pagination
          {...props.paginationProps}
          disabled={props.disabled ?? props.paginationProps?.disabled}
          className={getClassName({
            name: 'finallyreact-table__pagination',
            props,
            simple,
            custom: props.paginationProps?.className
          })}
        />
      )}
    </>
  );
}

export default React.memo(Table);
