import React, { HTMLAttributes, useMemo } from 'react';
import { checkHex, classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './LoadingStyles';

export interface LoadingProps extends HTMLAttributes<any> {
  color?: string; // only works with border-{color} utility classes
  simple?: boolean;
  spinnerProps?: HTMLAttributes<any>;
  text?: string;
  textProps?: HTMLAttributes<any>;
  rainbow?: boolean;
}

const omitValues = ['color', 'simple', 'spinnerProps', 'text', 'textProps', 'rainbow'];

/**
 * Loading component for displaying a loading spinner
 * @param props LoadingProps
 */
export function Loading(props: LoadingProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  return (
    <div
      {...omit(props, omitValues)}
      className={classnames('finallyreact-loading', props.className)}
      role={props.role ?? 'status'}
      aria-label={props['aria-label'] ?? props.text ?? 'Loading'}
      aria-busy={props['aria-busy'] ?? true}
      tabIndex={props.tabIndex ?? 0}
    >
      <div
        {...(props.spinnerProps || {})}
        className={getClassName({
          name: 'finallyreact-loading__icon',
          props,
          simple,
          custom: props.spinnerProps?.className
        })}
        style={{
          borderTopColor: checkHex(props.color),
          borderLeftColor: checkHex(props.color)
        }}
      />

      {props.text && (
        <div
          {...(props.textProps || {})}
          className={classnames('finallyreact-loading__text', props.textProps?.className)}
        >
          {props.text}
        </div>
      )}
    </div>
  );
}

export default Loading;
