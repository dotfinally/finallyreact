import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './AccordionStyles';

export interface AccordionProps extends Omit<HTMLAttributes<any>, 'title'> {
  arrowProps?: HTMLAttributes<any>;
  contentProps?: HTMLAttributes<any>;
  customHeader?: React.ReactNode;
  initialOpen?: boolean;
  disabled?: boolean;
  headerProps?: HTMLAttributes<any>;
  open?: boolean;
  preventAutoOpen?: boolean;
  rounded?: boolean;
  simple?: boolean;
  text?: string;
  title?: string | React.ReactNode;
  titleHeader?: boolean;
  titleProps?: HTMLAttributes<any>;
}

const omitValues = [
  'arrowProps',
  'contentProps',
  'customHeader',
  'initialOpen',
  'disabled',
  'headerProps',
  'open',
  'preventAutoOpen',
  'rounded',
  'simple',
  'text',
  'title',
  'titleHeader',
  'titleProps'
];

/**
 * Accordion component for displaying content in an expandable/collapsible container
 * @param props AccordionProps
 */
export function Accordion(props: AccordionProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [open, setOpen] = useState(props.initialOpen);

  useEffect(() => {
    if (props.open !== undefined) {
      setOpen(props.open);
    }
  }, [props.open]);

  const children = useMemo(() => {
    return props.children;
  }, [props.children]);

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-accordion',
        props,
        simple,
        open,
        custom: props.className
      })}
      role={props.role ?? 'region'}
      aria-label={props['aria-label'] ?? `${props.title} accordion`}
      aria-disabled={props.disabled}
      aria-expanded={open}
      tabIndex={props.tabIndex ?? -1}
    >
      {props.customHeader ? (
        <div
          onClick={(e) => {
            if (!props.disabled) {
              if (!props.preventAutoOpen) {
                setOpen(!open);
              }
              props.onClick?.(e);
            }
          }}
          onKeyDown={(e) => {
            if (!props.disabled) {
              if (e.key === 'Enter' && !props.preventAutoOpen) {
                setOpen(!open);
              }
              props.onKeyDown?.(e);
            }
          }}
        >
          {props.customHeader}
        </div>
      ) : (
        <div
          {...(props.headerProps || {})}
          className={getClassName({
            name: 'finallyreact-accordion__header',
            props,
            simple,
            open,
            custom: props.headerProps?.className
          })}
          onClick={(e) => {
            if (!props.disabled) {
              if (!props.preventAutoOpen) {
                setOpen(!open);
              }
              props.onClick?.(e);
              props.headerProps?.onClick?.(e);
            }
          }}
          onKeyDown={(e) => {
            if (!props.disabled) {
              if (e.key === 'Enter' && !props.preventAutoOpen) {
                setOpen(!open);
              }
              props.onKeyDown?.(e);
              props.headerProps?.onKeyDown?.(e);
            }
          }}
          tabIndex={props.headerProps?.tabIndex ?? 0}
        >
          {props.title &&
            (typeof props.title !== 'string' ? (
              props.title
            ) : props.titleHeader ? (
              <h3 {...(props.titleProps || {})} className={classnames('header_title', props.titleProps?.className)}>
                {props.title}
              </h3>
            ) : (
              <div {...(props.titleProps || {})} className={classnames('header_title', props.titleProps?.className)}>
                {props.title}
              </div>
            ))}
          <div
            {...(props.arrowProps || {})}
            className={getClassName({
              name: 'finallyreact-accordion__header_arrow',
              props,
              simple,
              open,
              custom: props.arrowProps?.className
            })}
          />
        </div>
      )}

      <div
        {...(props.contentProps || {})}
        className={getClassName({
          name: 'finallyreact-accordion__content',
          props,
          simple,
          open,
          custom: props.contentProps?.className
        })}
        aria-hidden={!open}
        tabIndex={props.contentProps?.tabIndex ?? -1}
      >
        {props.text ? (
          <div
            className={getClassName({
              name: 'finallyreact-accordion__content_text',
              props,
              simple,
              open
            })}
            tabIndex={0}
          >
            {props.text}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default Accordion;
