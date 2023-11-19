import { ModalProps } from './Modal';
import { filterClassName } from '@util/helpers/classFilter';

export function getClassName({
  name,
  props,
  simple,
  isMobile,
  custom
}: {
  name: string;
  props: ModalProps;
  simple: boolean;
  isMobile?: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-modal') {
    if (!props.show) {
      value += ' none';
    }
  }

  if (name === 'finallyreact-modal__overlay') {
    value += ' stone-8-bg bottom-0 left-0 opacity-50 fixed right-0 top-0 transition-opacity-ease-out z-300';
  }

  if (name === 'finallyreact-modal__card') {
    value += ' fixed top-10p left-50p translate-50-50 z-310';

    if (isMobile) {
      value += ' scroll-y';
    }
  }

  if (name === 'finallyreact-modal__card_close') {
    value += ' after-close';
  }

  if (!simple) {
    if (name === 'finallyreact-modal__card') {
      value += ' white-bg';

      if (isMobile) {
        value += ' w-95p';
      } else {
        value += ' w-30';
      }
    }

    if (name === 'finallyreact-modal__card_header') {
      value += ' border-b-1 border-stone-8 p-1';
    }

    if (name === 'finallyreact-modal__card_title') {
      value + ' text-md m-0';
    }

    if (name === 'finallyreact-modal__card_close') {
      value += ' cursor-pointer normal absolute right-1 top-1';
    }

    if (name === 'finallyreact-modal__card_text') {
      value += ' p-1';
    }
  }

  return filterClassName(value, custom);
}
