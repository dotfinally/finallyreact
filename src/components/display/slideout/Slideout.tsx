import React, { HTMLAttributes, useEffect, useMemo } from 'react';
import { getFinallyConfig, omit } from '@util/index';
import { getClassName } from './SlideoutStyles';

export interface SlideoutProps extends HTMLAttributes<any> {
  cardProps?: HTMLAttributes<any>;
  closeProps?: HTMLAttributes<any>;
  contentProps?: HTMLAttributes<any>;
  customHeader?: React.ReactNode;
  headerProps?: HTMLAttributes<any>;
  customFooter?: React.ReactNode;
  onClose: () => void;
  overlayProps?: HTMLAttributes<any>;
  preventOutsideClick?: boolean;
  show?: boolean;
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  title?: string; // accordion title
}

const omitValues = [
  'cardProps',
  'closeProps',
  'contentProps',
  'customHeader',
  'headerProps',
  'customFooter',
  'onClose',
  'overlayProps',
  'preventOutsideClick',
  'show',
  'simple',
  'size',
  'text',
  'title'
];

/**
 * Slideout component that appears over your app to display content in a side panel.
 * @param props SlideoutProps
 */
export function Slideout(props: SlideoutProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const slideoutCardId = useMemo(() => {
    return props.cardProps?.id || `finallyreact-slideout__card`;
  }, []);

  const children = useMemo(() => {
    return props.children;
  }, [props.children]);

  useEffect(() => {
    if (props.show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // if props.show, force focus on the slideout
    if (props.show && slideoutCardId) {
      const slideout = document.getElementById(slideoutCardId);
      slideout?.focus?.();
    }
  }, [props.show]);

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-slideout',
        props,
        simple,
        custom: props.className
      })}
      style={props.style}
      role={props.role ?? 'dialog'}
      aria-modal="true"
      aria-hidden={props['aria-hidden'] ?? !props.show}
      aria-expanded={props['aria-expanded'] ?? props.show}
      aria-label={props['aria-label'] ?? props.preventOutsideClick ? 'Slideout' : 'Slideout, press escape to close'}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && !props.preventOutsideClick) {
          props.onClose();
        }
      }}
    >
      <div
        {...(props.overlayProps || {})}
        className={getClassName({
          name: 'finallyreact-slideout__overlay',
          props,
          simple,
          custom: props.overlayProps?.className
        })}
        onClick={() => !props.preventOutsideClick && props.onClose()}
      />

      <div
        {...(props.cardProps || {})}
        id={slideoutCardId}
        className={getClassName({
          name: 'finallyreact-slideout__card',
          props,
          simple,
          custom: props.cardProps?.className
        })}
        tabIndex={props.cardProps?.tabIndex ?? 0}
        aria-label={props.cardProps?.['aria-label'] ?? 'Slideout Card'}
      >
        {props.customHeader ? (
          props.customHeader
        ) : (
          <div
            {...(props.headerProps || {})}
            className={getClassName({
              name: 'finallyreact-slideout__card-header',
              props,
              simple,
              custom: props.headerProps?.className
            })}
            tabIndex={props.headerProps?.tabIndex ?? 0}
            aria-label={props.headerProps?.['aria-label'] ?? 'Slideout Header'}
          >
            {props.title && (
              <div
                className={getClassName({
                  name: 'finallyreact-slideout__card-title',
                  props,
                  simple
                })}
                tabIndex={props.headerProps?.tabIndex ?? 0}
              >
                {props.title}
              </div>
            )}
            <div
              {...(props.closeProps || {})}
              className={getClassName({
                name: 'finallyreact-slideout__card-close',
                props,
                simple,
                custom: props.closeProps?.className
              })}
              onClick={() => props.onClose()}
              tabIndex={props.closeProps?.tabIndex ?? 0}
              aria-label={props.closeProps?.['aria-label'] ?? 'Close Slideout'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.onClose();
                }
              }}
            />
          </div>
        )}

        <div
          {...(props.contentProps || {})}
          className={getClassName({
            name: 'finallyreact-slideout__card-content',
            props,
            simple,
            custom: props.contentProps?.className
          })}
        >
          {props.text ? (
            <div
              className={getClassName({
                name: 'finallyreact-slideout__card-text',
                props,
                simple
              })}
              tabIndex={0}
            >
              {props.text}
            </div>
          ) : (
            children
          )}
        </div>

        {props.customFooter && props.customFooter}
      </div>
    </div>
  );
}

export default Slideout;
