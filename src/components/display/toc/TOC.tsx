import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { getFinallyConfig, getHeaders, omit } from '@util/index';
import { getClassName } from './TOCStyles';

export interface TableOfContentsProps extends HTMLAttributes<any> {
  simple?: boolean;
  refId: string;
  levelProps?: HTMLAttributes<any>;
}

const omitValues = ['simple', 'refId', 'levelProps'];

/**
 * Display table of contents based on headings in the page
 * @param props TableOfContentsProps
 */
export function TableOfContents(props: TableOfContentsProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setHeaders(getHeaders(props.refId));
  }, []);

  function onClickHeader(header: any) {
    const level = header.level;
    const id = header.id;
    const text = header.text;

    let element;
    if (id) {
      element = document.getElementById(id);
    } else {
      const levelElements = document.getElementsByTagName(level);

      // find element with text
      for (let i = 0; i < levelElements.length; i++) {
        if (levelElements[i].textContent === text) {
          element = levelElements[i];
          break;
        }
      }
    }

    if (element) {
      // scroll until the element is visible
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-toc',
        props,
        simple,
        custom: props.className
      })}
      aria-label={props.title ?? 'Table of Contents'}
    >
      {headers.map((header, index) => {
        return (
          <div
            {...(props.levelProps || {})}
            key={`toc-header-link-${index}`}
            className={getClassName({
              name: `finallyreact-toc__${header.level}`,
              props,
              simple,
              custom: props.levelProps?.className
            })}
            tabIndex={props.levelProps?.tabIndex ?? 0}
            onClick={(e) => {
              onClickHeader(header);
              props.levelProps?.onClick?.(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClickHeader(header);
              }
              props.levelProps?.onKeyDown?.(e);
            }}
          >
            {header.text}
          </div>
        );
      })}
    </div>
  );
}

export default TableOfContents;
