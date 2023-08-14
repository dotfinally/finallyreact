import React, { HTMLAttributes, useMemo, useState } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './PopStyles';

export interface PopWrapperProps extends HTMLAttributes<any> {
  customDisplay?: React.ReactNode;
  location?: 'top' | 'bottom' | 'left' | 'right';
  simple?: boolean;
  text?: string;
  triggerType?: 'click' | 'hover' | 'manual';
  show?: boolean;
  tooltipProps?: HTMLAttributes<any>;
}

const omitValues = ['customDisplay', 'location', 'simple', 'text', 'triggerType', 'show', 'tooltipProps'];

/**
 * Pop component for displaying a tooltip around a component, on hover or click.
 * @param props PopWrapperProps
 */
export function Pop(props: PopWrapperProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [showHover, setShowHover] = useState(false);
  const [showClick, setShowClick] = useState(false);

  const location = props.location || 'bottom';
  const triggerType = props.triggerType || 'hover';

  return (
    <div
      {...omit(props, omitValues)}
      id={props.id}
      className={getClassName({
        name: 'finallyreact-pop',
        props,
        simple,
        custom: props.className
      })}
      style={props.style}
      onMouseEnter={() => {
        setShowHover(true);
      }}
      onMouseLeave={() => setShowHover(false)}
      onClick={() => {
        setShowClick(!showClick);
      }}
      onFocus={() => {
        setShowHover(true);
      }}
      onBlur={() => {
        setShowHover(false);
      }}
      role={props.role ?? 'tooltip'}
      aria-label={props['aria-label'] ?? props.text ?? 'Tooltip for more information'}
      aria-describedby={props['aria-describedby'] ?? props.tooltipProps?.id ?? undefined}
    >
      <>
        {((triggerType === 'hover' && showHover) ||
          (triggerType === 'click' && showClick) ||
          (triggerType === 'manual' && props.show)) && (
          <div
            {...props.tooltipProps}
            className={classnames(
              getClassName({
                name: 'finallyreact-pop__display',
                props,
                simple,
                custom: props.tooltipProps?.className
              }),
              getClassName({
                name: `finallyreact-pop__${location}`,
                props,
                simple,
                custom: props.tooltipProps?.className
              })
            )}
          >
            {props.text ? props.text : props.customDisplay}
          </div>
        )}
        {props.children}
      </>
    </div>
  );
}

export default Pop;
