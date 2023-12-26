import React, { HTMLAttributes, useMemo, useCallback, useState, useEffect } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { Pagination, PaginationProps } from '../pagination/Pagination';
import { getClassName } from './TableStyles';
import { UpArrowIcon } from '@icons/UpArrowIcon';
import { DownArrowIcon } from '@icons/DownArrowIcon';

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
  isMobile?: boolean;
  mobileCellKeyProps?: HTMLAttributes<any>;
  mobileCellValueProps?: HTMLAttributes<any>;
  defaultSortOrder?: {
    index: string | number;
    order?: 'asc' | 'desc';
  }[];
  onSort?: (
    sortOrder: {
      index: string | number;
      order?: 'asc' | 'desc';
    }[]
  ) => void;
  sortIconProps?: HTMLAttributes<any>;
  customSortIconAsc?: React.ReactNode;
  customSortIconDesc?: React.ReactNode;
}

export interface TableColumnProps extends HTMLAttributes<any> {
  index: string | number;
  label?: any;
  headerCell?: (headerIndex: string | number, headerLabel: any) => React.ReactNode;
  enableSort?: boolean;
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
  'disabled',
  'isMobile',
  'mobileCellKeyProps',
  'mobileCellValueProps',
  'defaultSortOrder',
  'onSort',
  'sortIconProps',
  'customSortIconAsc',
  'customSortIconDesc'
];
const omitColumnValues = ['index', 'label', 'headerCell', 'rowCell'];
const omitRowValues = ['cells'];
const omitRowCellValues = ['index', 'label', 'render'];

/**
 * Table component for displaying data in a tabular format
 * @param props TableProps
 */
export function Table(props: TableProps) {
  const [sortOrder, setSortOrder] = useState(props.defaultSortOrder || []);

  useEffect(() => {
    if (props.defaultSortOrder) {
      setSortOrder(props.defaultSortOrder);
    }
  }, [props.defaultSortOrder]);

  function getSortOrderForColumn(columnIndex: string | number) {
    return sortOrder.find((order) => order.index === columnIndex)?.order || undefined;
  }

  function setSortOrderForColumn(columnIndex: string | number) {
    const currentSortOrder = getSortOrderForColumn(columnIndex);
    let newSortOrder;

    if (currentSortOrder === 'asc') {
      newSortOrder = sortOrder.map((order) => {
        if (order.index === columnIndex) {
          return { ...order, order: 'desc' };
        } else {
          return order;
        }
      });
    } else if (currentSortOrder === 'desc') {
      newSortOrder = sortOrder.filter((order) => order.index !== columnIndex);
    } else {
      newSortOrder = [...sortOrder, { index: columnIndex, order: 'asc' }];
    }

    setSortOrder(newSortOrder);
    return newSortOrder;
  }

  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  if (!props.columns || !props.rows) {
    console.error('Table component requires columns and rows props');
    return null;
  }

  function onClickHeader(column: TableColumnProps) {
    if (props.onSort && column.enableSort) {
      const newOrder = setSortOrderForColumn(column.index);

      props.onSort(newOrder as any);
    }
  }

  const headerRow = useMemo(() => {
    const headers = props.columns.map((column) => {
      let render;
      if (column.headerCell) {
        render = column.headerCell(column.index, column.label);
      } else {
        render = column.label;
      }

      const columnSortOrder = getSortOrderForColumn(column.index);

      return (
        <th
          {...(props.headerRowCellProps || {})}
          {...omit(column, omitColumnValues)}
          key={`finallyreact-table__header-row_cell-${column.index}`}
          className={getClassName({
            name: 'finallyreact-table__header-row_cell',
            props,
            simple,
            custom: classnames(column?.className, props.headerRowCellProps?.className, column.enableSort && 'pointer')
          })}
          role="columnheader"
          tabIndex={props.headerRowCellProps?.tabIndex || 0}
          onClick={() => onClickHeader(column)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onClickHeader(column);
            }
          }}
        >
          <div
            className={getClassName({
              name: 'finallyreact-table__header-row_cell-content',
              props,
              simple
            })}
          >
            {render}

            {props.customSortIconAsc && columnSortOrder === 'asc' && props.customSortIconAsc}
            {props.customSortIconDesc && columnSortOrder === 'desc' && props.customSortIconDesc}

            {!props.customSortIconAsc && columnSortOrder === 'asc' && (
              <UpArrowIcon
                {...(props.sortIconProps || {})}
                className={getClassName({
                  name: 'finallyreact-table__header-row_cell-sort-asc',
                  props,
                  simple,
                  custom: props.sortIconProps?.className
                })}
                tabIndex={props.sortIconProps?.tabIndex || 0}
                aria-label="Sort Ascending"
              />
            )}

            {!props.customSortIconDesc && columnSortOrder === 'desc' && (
              <DownArrowIcon
                {...(props.sortIconProps || {})}
                className={getClassName({
                  name: 'finallyreact-table__header-row_cell-sort-desc',
                  props,
                  simple,
                  custom: props.sortIconProps?.className
                })}
                tabIndex={props.sortIconProps?.tabIndex || 0}
                aria-label="Sort Descending"
              />
            )}
          </div>
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
  }, [props.columns, props.headerRowCellProps, props.simple, sortOrder]);

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

  function getMobileTableRow(row: TableRowProps, index: number) {
    return (
      <div
        className={getClassName({
          name: 'finallyreact-table__row',
          props,
          simple,
          custom: `${row?.className} ${props.rowProps?.className}`
        })}
        key={`finallyreact-table__mobile-row-${index}`}
        aria-label={props.rowProps?.['aria-label'] || `Table Mobile Row ${index + 1}`}
      >
        {row.cells.map((cell, index) => {
          const cellValue = cell?.label || cell?.render(cell?.index, cell?.label);
          const cellHeader =
            props.columns[index]?.label ||
            props.columns[index]?.headerCell?.(props.columns[index]?.index, props.columns[index]?.label);

          return (
            <div
              className={getClassName({
                name: 'finallyreact-table__row_cell',
                props,
                simple,
                custom: `${cell?.className} ${props.rowCellProps?.className}`
              })}
              key={`finallyreact-table__mobile-row-${index}_cell-${index}`}
            >
              <div
                className={getClassName({
                  name: 'finallyreact-mobile-row__key',
                  props,
                  simple,
                  custom: `${props.mobileCellKeyProps?.className}`
                })}
              >
                {cellHeader}
              </div>
              <div
                className={getClassName({
                  name: 'finallyreact-mobile-row__value',
                  props,
                  simple,
                  custom: `${props.mobileCellKeyProps?.className}`
                })}
              >
                {cellValue}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return props.isMobile ? (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-table__mobile',
        props,
        simple,
        custom: props.className
      })}
      tabIndex={props.tabIndex || 0}
      aria-label={props['aria-label'] || 'Table Mobile View'}
      aria-disabled={props.disabled}
    >
      {props.rows.map((row, index) => getMobileTableRow(row, index))}
    </div>
  ) : (
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
