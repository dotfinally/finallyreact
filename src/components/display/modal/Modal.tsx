import React, { HTMLAttributes, useEffect, useMemo } from 'react';
import { getFinallyConfig, omit, useWindowSize } from '@util/index';
import { getClassName } from './ModalStyles';

export interface ModalProps extends HTMLAttributes<any> {
  cardProps?: HTMLAttributes<any>;
  closeProps?: HTMLAttributes<any>;
  contentProps?: HTMLAttributes<any>;
  customHeader?: React.ReactNode;
  headerProps?: HTMLAttributes<any>;
  onClose: () => void;
  overlayProps?: HTMLAttributes<any>;
  preventOutsideClick?: boolean;
  show?: boolean;
  simple?: boolean;
  text?: string;
  title?: string;
}

const omitValues = [
  'cardProps',
  'closeProps',
  'contentProps',
  'customHeader',
  'headerProps',
  'onClose',
  'overlayProps',
  'preventOutsideClick',
  'show',
  'simple',
  'text',
  'title'
];

/**
 * Modal component that appears over your app to display content in an overlay
 * @param props ModalProps
 */
export function Modal(props: ModalProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;
  const [windowWidth, windowHeight, screenSize, isMobile] = useWindowSize();

  const children = useMemo(() => {
    return props.children;
  }, [props.children]);

  useEffect(() => {
    if (props.show !== undefined) {
      if (props.show) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
  }, [props.show]);

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-modal',
        props,
        simple,
        isMobile,
        custom: props.className
      })}
      role={props.role ?? 'dialog'}
      aria-modal={props['aria-modal'] ?? true}
      aria-label={props['aria-label'] ?? props.title}
      aria-hidden={props['aria-hidden'] ?? !props.show}
      tab-index={props['tab-index'] ?? -1}
    >
      <div
        {...(props.overlayProps || {})}
        className={getClassName({
          name: 'finallyreact-modal__overlay',
          props,
          simple,
          isMobile,
          custom: props.overlayProps?.className
        })}
        onClick={(e) => {
          if (!props.preventOutsideClick) {
            props.onClose();
          }
          props.overlayProps?.onClick?.(e);
        }}
      />

      <div
        {...(props.cardProps || {})}
        className={getClassName({
          name: 'finallyreact-modal__card',
          props,
          simple,
          isMobile,
          custom: props.cardProps?.className
        })}
      >
        {props.customHeader ? (
          props.customHeader
        ) : (
          <div
            {...(props.headerProps || {})}
            className={getClassName({
              name: 'finallyreact-modal__card_header',
              props,
              simple,
              isMobile,
              custom: props.headerProps?.className
            })}
            tabIndex={props.headerProps?.tabIndex ?? -1}
          >
            {props.title && (
              <div
                className={getClassName({
                  name: 'finallyreact-modal__card_title',
                  props,
                  simple,
                  isMobile
                })}
                tabIndex={0}
                aria-label={props.title}
              >
                {props.title}
              </div>
            )}
            <div
              {...(props.closeProps || {})}
              className={getClassName({
                name: 'finallyreact-modal__card_close',
                props,
                simple,
                isMobile,
                custom: props.closeProps?.className
              })}
              onClick={(e) => {
                props.onClose();
                props.closeProps?.onClick?.(e);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.onClose();
                }
                props.closeProps?.onKeyDown?.(e);
              }}
              role="button"
              aria-label={props.closeProps?.['aria-label'] ?? 'click or press enter to close modal'}
              tabIndex={props.closeProps?.tabIndex ?? 0}
            />
          </div>
        )}

        <div
          {...(props.contentProps || {})}
          aria-label={props.text}
          tabIndex={props.contentProps?.tabIndex ?? 0}
          className={getClassName({
            name: 'finallyreact-modal__card_content',
            props,
            simple,
            isMobile,
            custom: props.contentProps?.className
          })}
        >
          {props.text ? (
            <div
              className={getClassName({
                name: 'finallyreact-modal__card_text',
                props,
                simple,
                isMobile
              })}
            >
              {props.text}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
