import React, { HTMLAttributes, useMemo } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './CardStyles';

export interface CardProps extends HTMLAttributes<any> {
  contentProps?: HTMLAttributes<any>;
  customFooter?: React.ReactNode;
  customHeader?: React.ReactNode;
  headerProps?: HTMLAttributes<any>;
  rounded?: boolean;
  shadow?: boolean;
  showHoverShadow?: boolean;
  simple?: boolean;
  title?: string;
  well?: boolean;
}

const omitValues = [
  'contentProps',
  'customFooter',
  'customHeader',
  'headerProps',
  'rounded',
  'shadow',
  'simple',
  'title',
  'well',
  'showHoverShadow'
];

/**
 * Card component for displaying content in a container with an optional header and footer
 * @param props CardProps
 */
export function Card(props: CardProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const showHeader = props.title || props.customHeader;
  let header = null;

  if (showHeader) {
    if (props.customHeader) {
      header = props.customHeader;
    } else {
      header = (
        <div
          {...(props.headerProps || {})}
          className={getClassName({
            name: 'finallyreact-card__header',
            props,
            simple,
            custom: props.headerProps?.className
          })}
        >
          {props.title && (
            <div
              className={getClassName({
                name: 'finallyreact-card__header_title',
                props,
                simple
              })}
              tabIndex={0}
            >
              {props.title}
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-card',
        props,
        simple,
        custom: props.className
      })}
      role={props.role ?? 'article'}
      aria-label={props.title ?? 'Card'}
    >
      {header}
      <div
        {...(props.contentProps || {})}
        className={classnames('finallyreact-card__content', props.contentProps?.className)}
      >
        {props.children}
      </div>
      {props.customFooter}
    </div>
  );
}

export default Card;
