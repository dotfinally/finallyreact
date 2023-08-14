import { filterClassName } from '@util/helpers/classFilter';
import { SlideoutProps } from './Slideout';

export function getClassName({
  name,
  props,
  simple,
  custom
}: {
  name: string;
  props: SlideoutProps;
  simple: boolean;
  custom?: string;
}) {
  let value = name;

  if (name === 'finallyreact-slideout') {
    value += ' z-400';

    if (props.show) {
      value += ' block';
    } else {
      value += ' none';
    }
  }

  if (name === 'finallyreact-slideout__card') {
    value += ' right-0 top-0 fixed h-screen z-410 w-0';

    if (props.size === 'sm') {
      value += ' w-full max-w-20';
    }

    if (props.size === 'md' || !props.size) {
      value += ' w-full max-w-30';
    }

    if (props.size === 'lg') {
      value += ' w-full max-w-40';
    }

    if (!simple) {
      value += ' white-bg';
    }
  }

  if (name === 'finallyreact-slideout__overlay') {
    value += ' stone-8-bg bottom-0 left-0 right-0 top-0 fixed opacity-50';
  }

  if (name === 'finallyreact-slideout__card-close') {
    value += ' after-close';

    if (!simple) {
      value += ' pointer normal absolute right-1 top-1';
    }
  }

  if (name === 'finallyreact-slideout__card-header') {
    if (!simple) {
      value += ' border-b-1 border-stone-8 p-1';
    }
  }

  if (name === 'finallyreact-slideout__card-title') {
    if (!simple) {
      value += ' text-md m-0';
    }
  }

  if (name === 'finallyreact-slideout__card-text') {
    if (!simple) {
      value += ' p-1';
    }
  }

  return filterClassName(value, custom);
}
