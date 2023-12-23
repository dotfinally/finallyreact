import React, { HTMLAttributes, useMemo } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './SkeletonLoadingStyles';

export interface SkeletonLoadingProps extends HTMLAttributes<any> {
  color?: string;
  simple?: boolean;
}

const omitValues = [
  'color',
  'simple'
];

/**
 * Card component for displaying a loading rectangle
 * @param props SkeletonLoadingProps
 */
export function SkeletonLoading(props: SkeletonLoadingProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-skeleton-loading',
        props,
        simple,
        custom: props.className
      })}
      role={props.role ?? 'card'}
      aria-label={props.title ?? 'Skeleton Loading'}
    />
  );
}

export default SkeletonLoading;
