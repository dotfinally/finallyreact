import React, { HTMLAttributes } from 'react';
import { classnames, omit } from '@util/index';

export interface MessageWrapperProps extends HTMLAttributes<any> {
  children: React.ReactNode;
  labelProps?: HTMLAttributes<any>;
  location?: 'top' | 'bottom';
  message: string;
  show: boolean;
}

const omitValues = ['children', 'labelProps', 'location', 'message', 'show'];

/**
 * MessageWrapper component for displaying a message around an element.
 * @param props MessageWrapperProps
 */
export function MessageWrapper(props: MessageWrapperProps) {
  const messageLocation = props.location || 'bottom';

  return (
    <div {...omit(props, omitValues)} className={classnames('finallyreact-message-wrapper', props.className)}>
      {props.show && props.message && messageLocation === 'top' && (
        <div
          {...props.labelProps}
          className={classnames('message-message', props.labelProps?.className)}
          role="alert"
          aria-label={props['aria-label'] ?? props.message ?? 'message'}
          aria-live="assertive"
        >
          {props.message}
        </div>
      )}
      {props.children}
      {props.show && props.message && messageLocation === 'bottom' && (
        <div
          {...props.labelProps}
          className={classnames('message-message', props.labelProps?.className)}
          role="alert"
          aria-label={props['aria-label'] ?? props.message ?? 'message'}
          aria-live="assertive"
        >
          {props.message}
        </div>
      )}
    </div>
  );
}

export default MessageWrapper;
