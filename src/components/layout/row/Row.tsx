import React, { HTMLAttributes, useMemo } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';

import { getClassName } from './RowStyles';

export interface RowProps extends HTMLAttributes<any> {
  verticalAlign?: 'top' | 'center' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  simple?: boolean;
}

const omitValues = ['verticalAlign', 'horizontalAlign', 'simple'];

/**
 * Row component for grouping elements in rows.
 * @param props RowProps
 */
export function Row(props: RowProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-row',
        props,
        simple,
        custom: props.className
      })}
    >
      {props.children}
    </div>
  );
}

export default Row;
