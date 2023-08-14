import React, { HTMLAttributes, useMemo } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './IconWrapperStyles';

export interface IconWrapperProps extends HTMLAttributes<any> {
  showIcon?: boolean;
  children: React.ReactNode;
  color?: string;
  icon: React.ReactNode;
  iconProps?: HTMLAttributes<any>;
  location?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  simple?: boolean;
  hidden?: boolean;
  hideIcon?: boolean;
}

const omitValues = ['showIcon', 'children', 'color', 'icon', 'iconProps', 'location', 'simple', 'hidden', 'hideIcon'];

/**
 * IconWrapper component for displaying an icon around an element.
 * @param props IconWrapperProps
 */
export function IconWrapper(props: IconWrapperProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const location = props.location || 'top-right';
  const [focused, setFocused] = React.useState(false);

  if (props.hidden) {
    return null;
  }

  const iconRender = (
    <div
      {...(props.iconProps || {})}
      className={classnames(
        'finallyreact-icon-wrapper__icon',
        location,
        ((props.showIcon !== false && props.hideIcon !== true && focused) || props.showIcon) && 'show',
        props.hideIcon && 'hide',
        props.iconProps?.className
      )}
      aria-label={props?.['aria-label'] ?? 'Icon on hover'}
    >
      {props.icon}
    </div>
  );

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-icon-wrapper',
        props,
        simple,
        custom: props.className
      })}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
    >
      {!props.hideIcon && (
        <>
          {location === 'top-left' && (
            <div
              className={getClassName({
                name: 'finallyreact-icon_top',
                props,
                simple
              })}
            >
              {iconRender}
            </div>
          )}

          {location === 'bottom-left' && (
            <div
              className={getClassName({
                name: 'finallyreact-icon_bottom',
                props,
                simple
              })}
            >
              {iconRender}
            </div>
          )}
        </>
      )}

      {props.children}

      {!props.hideIcon && (
        <>
          {location === 'top-right' && (
            <div
              className={getClassName({
                name: 'finallyreact-icon_top',
                props,
                simple
              })}
            >
              {iconRender}
            </div>
          )}

          {location === 'bottom-right' && (
            <div
              className={getClassName({
                name: 'finallyreact-icon_bottom',
                props,
                simple
              })}
            >
              {iconRender}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default IconWrapper;
