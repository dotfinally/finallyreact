import React, { forwardRef, HTMLAttributes, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { generateId, omit, useWindowSize, getFinallyConfig } from '@util/index';
import { getClassName } from './NotificationStyles';

export interface NotificationProps extends HTMLAttributes<any> {
  closeProps?: HTMLAttributes<any>;
  onClose?: () => void;
  permanent?: boolean;
  simple?: boolean;
  text?: string;
  textProps?: HTMLAttributes<any>;
  time?: number; // time in ms to show notification
}

const omitValues = ['closeProps', 'onClose', 'permanent', 'simple', 'text', 'textProps', 'time'];

const DEFAULT_NOTIFICATION_TIME = 3000; // 3 seconds

/**
 * Notification component for displaying a message on top of the screen.
 * Pass in a ref and call ref.current.trigger() to show the notification.
 * @param props NotificationProps
 */
export const Notification = forwardRef((props: NotificationProps, ref) => {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [windowWidth, windowHeight, screenSize, isMobile] = useWindowSize();
  const [show, setShow] = useState<boolean>();
  const [timeKey, setTimeKey] = useState<number>();
  const [notificationY, setNotificationY] = useState<string>();
  const time = props.time || DEFAULT_NOTIFICATION_TIME;
  let intervalCheck;

  // give notification a unique id
  const id = useMemo(() => {
    return props.id || `finallyreact-notification-${generateId()}`;
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      trigger() {
        if (!show) {
          calculateHeight();
          setTimeKey(Date.now());
          setShow(true);

          startTimer();

          // recheck height every 200ms
          intervalCheck = setInterval(() => {
            calculateHeight();
          }, 250);
        }
      }
    }),
    []
  );

  function startTimer() {
    if (!props.permanent) {
      setTimeout(() => {
        // notification or any of its children is focused, don't close it and restart timer
        const notification = document.getElementById(id);
        if (isFocusInsideNotification(notification)) {
          startTimer();
        } else {
          // close notification and clear height check interval
          setShow(false);
          setTimeKey(null);
          clearInterval(intervalCheck);
        }
      }, time);
    }
  }

  function isFocusInsideNotification(notification: HTMLElement | null) {
    if (!notification) return false;
    const activeElement = document.activeElement;
    return notification.contains(activeElement);
  }

  useEffect(() => {
    if (props.permanent && show) {
      // force focus on notification
      const notification = document.getElementById(id);
      notification?.focus();
    }
  }, [show]);

  function calculateHeight() {
    // get number of finallyreact-notification elements on screen
    const currentNotifications = document.getElementsByClassName('finallyreact-notification');
    const thisNotification = document.getElementById(id);

    const compareTime = thisNotification ? Number(thisNotification.getAttribute('time-key')) : Date.now();

    // filter out current notification id
    const filteredNotifications = Array.from(currentNotifications).filter((el) => {
      return el.id !== id;
    });

    // sort by key timestamp and only keep notifications older than current time
    const sortedNotifications = filteredNotifications
      .sort((a, b) => {
        return Number(a.getAttribute('time-key')) - Number(b.getAttribute('time-key'));
      })
      .filter((el) => {
        return Number(el.getAttribute('time-key')) < compareTime;
      });

    // get last notification element
    const lastNotification = sortedNotifications[sortedNotifications.length - 1];
    // get y position of lastNotification
    const lastNotificationY = lastNotification ? lastNotification.getBoundingClientRect().y : 10;
    // get height of lastNotification
    const lastNotificationHeight = lastNotification ? lastNotification.getBoundingClientRect().height : 10;
    // determine y position of new notification
    const newNotificationY = `${lastNotificationY + lastNotificationHeight + 10}px`;

    setNotificationY(newNotificationY);

    // if there are no other notifications, we can clear interval check
    if (filteredNotifications.length === 0) {
      clearInterval(intervalCheck);
    }
  }

  const children = useMemo(() => {
    return props.children;
  }, [props.children]);

  if (!show) {
    return null;
  }

  const style = {
    ...props.style,
    top: notificationY
  };

  return (
    <div
      {...omit(props, omitValues)}
      id={id}
      time-key={timeKey}
      className={getClassName({
        name: 'finallyreact-notification',
        props,
        simple,
        isMobile,
        custom: props.className
      })}
      style={{
        ...style,
        ...props.style
      }}
      role={props.role ?? 'status'}
      aria-atomic={props['aria-atomic'] ?? true}
      aria-label={props['aria-label'] ?? props.text ?? 'Notification'}
      aria-describedby={props['aria-describedby'] ?? props.textProps?.id ?? undefined}
      tabIndex={props.tabIndex ?? 0}
    >
      {props.text ? (
        <div
          {...(props.textProps || {})}
          className={getClassName({
            name: 'finallyreact-notification__text',
            props,
            simple,
            isMobile,
            custom: props.textProps?.className
          })}
        >
          {props.text}
        </div>
      ) : (
        children
      )}

      <div
        {...(props.closeProps || {})}
        className={getClassName({
          name: 'finallyreact-notification__close',
          props,
          simple,
          isMobile,
          custom: props.closeProps?.className
        })}
        onClick={() => setShow(false)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setShow(false);
          }
        }}
        aria-label={props.closeProps?.['aria-label'] ?? 'Close notification'}
      />
    </div>
  );
});
