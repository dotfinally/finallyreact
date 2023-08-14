import { filterClassName } from '@util/helpers/classFilter';
import { NotificationProps } from './Notification';

export function getClassName({
  name,
  props,
  simple,
  isMobile,
  custom
}: {
  name: string;
  props: NotificationProps;
  simple: boolean;
  isMobile?: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-notification') {
    value += ' block left-50p max-w-98p fixed translate-50-5 z-500 white-bg black';

    if (!simple) {
      value += ' border-1 p-1/2';

      if (isMobile) {
        value += ' w-98p';
      } else {
        value += ' w-30';
      }
    }
  }

  if (name === 'finallyreact-notification__close') {
    value += ' cursor-pointer normal fixed right-2/5 top-2/5 after-close';
  }

  return filterClassName(value, custom);
}
