import React, { HTMLAttributes, useMemo } from 'react';
import { classnames, omit, useWindowSize } from '@util/index';

import { getClassName } from './ColumnStyles';

/**
 * Column component.
 * Use this component to create a column in a row.
 * Specify the size of the column with different size props.
 * @prop xs: Extra small size.
 * @prop sm: Small size.
 * @prop md: Medium size.
 * @prop lg: Large size.
 * @prop xl: Extra large size.
 */
export interface ColumnProps extends HTMLAttributes<any> {
  children?: React.ReactNode;
  xs?: number; // width % for extra small (mobile) screens
  sm?: number; // width % for small screens
  md?: number; // width % for medium screens
  lg?: number; // width % for large screens
  xl?: number; // width % for extra large screens
  xxl?: number; // width % for extra extra large screens
  verticalAlign?: 'top' | 'center' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
}

const omitValues = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'verticalAlign', 'horizontalAlign'];

/**
 * Column component for grouping elements in columns.
 * Includes responsive props for different screen sizes.
 * @param props ColumnProps
 */
export function Column(props: ColumnProps) {
  const { windowWidth, screenSize } = useWindowSize();

  // Determine width percent based on input props and current screen width
  const columnSize = useMemo(() => {
    const xsSize = props.xs == null ? 100 : props.xs;
    const smSize = props.sm == null ? xsSize : props.sm;
    const mdSize = props.md == null ? smSize : props.md;
    const lgSize = props.lg == null ? mdSize : props.lg;
    const xlSize = props.xl == null ? lgSize : props.xl;
    const xxlSize = props.xxl == null ? xlSize : props.xxl;

    let sizeToUse = 0;

    if (screenSize === 'xs') {
      sizeToUse = xsSize;
    } else if (screenSize === 'sm') {
      sizeToUse = smSize;
    } else if (screenSize === 'md') {
      sizeToUse = mdSize;
    } else if (screenSize === 'lg') {
      sizeToUse = lgSize;
    } else if (screenSize === 'xl') {
      sizeToUse = xlSize;
    } else if (screenSize === 'xxl') {
      sizeToUse = xxlSize;
    }

    if (sizeToUse < 0) {
      sizeToUse = 0;
    } else if (sizeToUse > 100) {
      sizeToUse = 100;
    }

    return `${sizeToUse}%`;
  }, [windowWidth]);

  const childrenContent = useMemo(() => {
    return props.children;
  }, [props.children]);

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-column',
        props,
        custom: props.className
      })}
      style={{ ...props.style, width: columnSize }}
    >
      {childrenContent}
    </div>
  );
}

export default Column;
