import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { getFinallyConfig, omit } from '@util/index';
import { getClassName } from './PaginationStyles';

import { Dropdown, DropdownProps } from '../../inputs/dropdown/Dropdown';

export interface PaginationProps extends HTMLAttributes<any> {
  arrowProps?: HTMLAttributes<any>;
  disabled?: boolean;
  readOnly?: boolean;
  leftArrowProps?: HTMLAttributes<any>;
  maxDisplayPages?: number;
  onChangePage?: (page: number, size: number) => void;
  page?: number;
  pageProps?: HTMLAttributes<any>;
  rightArrowProps?: HTMLAttributes<any>;
  showSizeDropdown?: boolean;
  simple?: boolean;
  size?: number;
  sizeDropdownProps?: DropdownProps;
  sizes?: number[];
  total?: number;
}

const omitValues = [
  'arrowProps',
  'disabled',
  'readOnly',
  'leftArrowProps',
  'maxDisplayPages',
  'onChangePage',
  'page',
  'pageProps',
  'rightArrowProps',
  'showSizeDropdown',
  'simple',
  'size',
  'sizeDropdownProps',
  'sizes',
  'total'
];

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 10;
const DEFAULT_MAX_DISPLAY_PAGES = 5;
const DEFAULT_SIZES = [5, 10, 25, 50, 100];

/**
 * Pagination component for displaying a pagination bar with page numbers and size dropdown.
 * Can be used with any UI element that requires pagination, such as tables.
 * Note: pages are 1-indexed.
 * @param props PaginationProps
 */
export function Pagination(props: PaginationProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const disabled = props.disabled || props.readOnly;

  const [currentPage, setCurrentPage] = useState(props.page || DEFAULT_PAGE);
  const [currentSize, setCurrentSize] = useState(props.size || DEFAULT_SIZE);

  const totalPages = Math.ceil(props.total / currentSize);
  const maxDisplayPages = props.maxDisplayPages || DEFAULT_MAX_DISPLAY_PAGES;
  const showArrows = totalPages > maxDisplayPages;
  const sizes = props.sizes || DEFAULT_SIZES;

  const showFirstPageSquare = () => currentPage > 1 + Math.floor(maxDisplayPages / 2);
  const showLastPageSquare = () => currentPage < totalPages - Math.floor(maxDisplayPages / 2);

  useEffect(() => {
    setCurrentPage(props.page || DEFAULT_PAGE);
    setCurrentSize(props.size || DEFAULT_SIZE);
  }, [props.total, props.size]);

  function handlePageChange(page: number) {
    if (disabled) {
      return;
    }

    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
    props.onChangePage?.(page, currentSize);
  }

  function handleSizeChange(size: number) {
    if (disabled) {
      return;
    }

    if (size < 1) {
      return;
    }

    setCurrentSize(size);
    setCurrentPage(1);
    props.onChangePage?.(currentPage, size);
  }

  function getPages() {
    const pages = [];

    // get start and end indexes, while always shows the maxDisplayPages number of pages
    let start = Math.max(currentPage - Math.floor(maxDisplayPages / 2), 1);
    let end = Math.min(start + maxDisplayPages - 1, totalPages);

    // if the pages don't fill the maxDisplayPages, adjust start and end
    if (end - start + 1 < maxDisplayPages) {
      start = Math.max(end - maxDisplayPages + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      if (i <= totalPages) {
        pages.push(
          <div
            {...(props.pageProps || {})}
            key={i}
            className={getClassName({
              name: i === currentPage ? 'finallyreact-pagination__page-active' : 'finallyreact-pagination__page',
              props,
              simple,
              custom: props.pageProps?.className
            })}
            onClick={() => {
              if (disabled) {
                return;
              }
              handlePageChange(i);
            }}
            aria-current={i === currentPage ? 'page' : undefined}
            aria-controls="search-results"
            aria-disabled={disabled || currentPage === start || currentPage === end ? true : undefined}
            tabIndex={0}
            aria-label={`Pagination, press for page ${i}`}
            onKeyDown={(e) => {
              if (disabled) {
                return;
              }

              if (e.key === 'Enter') {
                handlePageChange(i);
              }
            }}
          >
            {i}
          </div>
        );
      }
    }
    return pages;
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-pagination',
        props,
        simple,
        custom: props.className
      })}
      role={props.role || 'navigation'}
      aria-label={props['aria-label'] || 'Pagination for search results'}
    >
      {showArrows && showFirstPageSquare() && (
        <div
          className={getClassName({
            name: 'finallyreact-pagination__page',
            props,
            simple,
            custom: props.pageProps?.className
          })}
          onClick={() => handlePageChange(1)}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if (e.key === 'Enter') {
              handlePageChange(1);
            }
          }}
          tabIndex={0}
          aria-label="Pagination, press for page 1"
        >
          1
        </div>
      )}

      {showArrows && (
        <div
          {...(props.arrowProps || {})}
          className={getClassName({
            name: 'finallyreact-pagination__container-arrow',
            props,
            simple,
            custom: props.arrowProps?.className
          })}
          onClick={() => {
            if (disabled) {
              return;
            }

            handlePageChange(currentPage - 1);
          }}
          tabIndex={0}
          aria-disabled={disabled || currentPage === 1 ? true : undefined}
          aria-label={`Pagination previous arrow, press for page ${currentPage - 1}`}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if (e.key === 'Enter') {
              handlePageChange(currentPage - 1);
            }
          }}
        >
          <div
            {...(props.leftArrowProps || {})}
            className={getClassName({
              name: 'finallyreact-pagination__arrow-left',
              props,
              simple,
              custom: props.leftArrowProps?.className
            })}
          />
        </div>
      )}

      {getPages()}

      {showArrows && (
        <div
          {...(props.arrowProps || {})}
          className={getClassName({
            name: 'finallyreact-pagination__container-arrow',
            props,
            simple,
            custom: props.arrowProps?.className
          })}
          onClick={() => handlePageChange(currentPage + 1)}
          tabIndex={0}
          aria-disabled={disabled || currentPage === totalPages ? true : undefined}
          aria-label={`Pagination next arrow, press for page ${currentPage + 1}`}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if (e.key === 'Enter') {
              handlePageChange(currentPage + 1);
            }
          }}
        >
          <div
            {...(props.rightArrowProps || {})}
            className={getClassName({
              name: 'finallyreact-pagination__arrow-right',
              props,
              simple,
              custom: props.rightArrowProps?.className
            })}
          />
        </div>
      )}

      {showArrows && showLastPageSquare() && (
        <div
          className={getClassName({
            name: 'finallyreact-pagination__page',
            props,
            simple,
            custom: props.pageProps?.className
          })}
          onClick={() => handlePageChange(totalPages)}
          onKeyDown={(e) => {
            if (disabled) {
              return;
            }

            if (e.key === 'Enter') {
              handlePageChange(totalPages);
            }
          }}
          tabIndex={0}
          aria-label={`Pagination, press for page ${totalPages}`}
        >
          {totalPages}
        </div>
      )}

      {props.showSizeDropdown && (
        <div>
          <Dropdown
            {...props.sizeDropdownProps}
            className={getClassName({
              name: 'finallyreact-pagination__size-dropdown',
              props,
              simple,
              custom: props.sizeDropdownProps?.className
            })}
            value={currentSize}
            textInputProps={{
              size: props.sizeDropdownProps?.size || 'sm',
              placeholder: props.sizeDropdownProps?.textInputProps?.placeholder || 'Rows'
            }}
            disabled={disabled ?? false}
            simple={props.simple}
            select={props.simple ? false : true}
            options={sizes.map((size) => ({ value: size, label: size }))}
            onChange={(e: any) => {
              if (disabled) {
                return;
              }

              handleSizeChange(parseInt(e.target.value));
            }}
            aria-label={props.sizeDropdownProps?.['aria-label'] || 'Pagination size dropdown'}
          />
        </div>
      )}
    </div>
  );
}

export default Pagination;
