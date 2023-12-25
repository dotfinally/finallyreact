import React, { HTMLAttributes, useMemo, useState } from 'react';
import { getFinallyConfig, omit } from '@util/index';
import Pop, { PopWrapperProps } from '@components/display/pop/Pop';
import { getClassName } from './CopyWrapperStyles';

export interface CopyWrapperProps extends HTMLAttributes<any> {
  children: React.ReactNode;
  color?: string;
  copyText?: string;
  iconProps?: HTMLAttributes<any>;
  location?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  popProps?: PopWrapperProps;
  simple?: boolean;
  hidden?: boolean;
  showIcon?: boolean;
}

const omitValues = [
  'children',
  'color',
  'copyText',
  'iconProps',
  'location',
  'popProps',
  'simple',
  'hidden',
  'showIcon'
];

/**
 * CopyWrapper component for displaying a copy icon around an element to copy any specified text.
 * @param props CopyWrapperProps
 */
export function CopyWrapper(props: CopyWrapperProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [showPop, setShowPop] = useState(false);
  const [focused, setFocused] = useState(false);

  const location = props.location || 'top-right';
  const triggerLocation = location === 'top-left' || location === 'bottom-left' ? 'right' : 'left';

  function onClickCopy() {
    if (props.copyText) {
      navigator.clipboard.writeText(props.copyText);

      // show pop for 1.5 seconds
      setShowPop(true);
      setTimeout(() => {
        setShowPop(false);
      }, 1500);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !props.hidden) {
      onClickCopy();
    }
    props.onKeyDown?.(e);
  }

  const copyIcon = (
    <Pop
      {...props.popProps}
      className={getClassName({
        name: 'finallyreact-copy-pop',
        location,
        props,
        simple,
        custom: props.popProps?.className
      })}
      tooltipProps={{
        ...props.popProps?.tooltipProps,
        className:
          props.popProps?.tooltipProps?.className ||
          (!simple &&
            getClassName({
              name: 'finallyreact-copy-pop__default-tooltip',
              props
            })),
        'aria-label': props.popProps?.tooltipProps?.['aria-label'] ?? props.popProps?.text
      }}
      triggerType="manual"
      show={showPop}
      text={props.popProps?.text || 'Copied to Clipboard!'}
      location={props.popProps?.location || triggerLocation}
      simple={simple}
    >
      {props.popProps?.children ? (
        <div onClick={onClickCopy}>{props.popProps?.children}</div>
      ) : (
        <div
          {...(props.iconProps || {})}
          className={getClassName({
            name: 'finallyreact-copy-icon',
            show: props.showIcon || (focused && props.showIcon !== false),
            props,
            simple,
            custom: props.iconProps?.className,
            additionalClassName: simple ? 'simple' : ''
          })}
          onClick={onClickCopy}
          tabIndex={props.iconProps?.tabIndex ?? 0}
          onKeyDown={onKeyDown}
          aria-label="Click to copy to clipboard"
        >
          {simple ? 'Copy' : ''}
        </div>
      )}
    </Pop>
  );

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-copy-wrapper',
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
      {!props.hidden && (location === 'top-left' || location === 'bottom-left') && copyIcon}

      {props.children}

      {!props.hidden && (location === 'top-right' || location === 'bottom-right') && copyIcon}
    </div>
  );
}

export default CopyWrapper;
