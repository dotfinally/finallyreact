import { filterClassName } from '@util/helpers/classFilter';
import { SidenavProps } from './Sidenav';

export function getClassName({
  name,
  props,
  custom,
  simple,
  open,
  disabled,
  active,
  isMobile
}: {
  name: string;
  props: SidenavProps;
  custom?: string;
  simple?: boolean;
  open?: boolean;
  disabled?: boolean;
  active?: boolean;
  isMobile?: boolean;
}) {
  let value = name;

  if (!props.customContent && !props.simple) {
    if (name === 'finallyreact-sidenav') {
      value += ' pb-3 border-r-1 border-r-stone-6 transition-2';

      if (!isMobile && props.sticky) {
        value += ' h-screen scroll-y scroll-x-hidden fixed';
      }

      if (props.withNavbar) {
        value += ' pt-3';
      }
    }

    if (!open) {
      if (name === 'finallyreact-sidenav') {
        value += ' w-4/5';
      }

      if (name === 'finallyreact_sidenav__category') {
        value += ' none';
      }

      if (name === 'finallyreact_sidenav__item') {
        value += ' none';
      }
    }

    if (name === 'finallyreact_sidenav__item') {
      value += ' flex py-3/10 pl-1 text-center text-none transition-2-all w-auto pointer';

      if (disabled) {
        value += ' cursor-default gray-7';
      } else {
        value += ' hover:blue-2-bg';
      }

      if (active) {
        value += ' blue-4-bg white hover:stone-10';
      } else {
        value += ' stone-10';
      }
    }

    if (name === 'finallyreact_sidenav__category-label') {
      value += ' text semibold p-1/2 ocean-7';
    }

    if (name === 'sidenav-collapse') {
      value +=
        ' white-bg pointer rounded-1 float-right -mr-4/5 mt-1/10 opacity-50 py-0 px-1/4 relative transition-7 z-200 hover:ocean-6 hover:opacity-100 after-arrow';

      if (open) {
        value += ' after-transform-rotate-180';
      }
    }
  }

  if (name === 'finallyreact-sidenav__mobile') {
    value += ' transition-5 z-230 white-bg scroll-y h-screen fixed pb-3 pt-2-1/2';

    if (open) {
      value += ' w-full';
    } else {
      value += ' w-0';
    }
  }

  if (name === 'finallyreact_sidenav__toggle') {
    value += ' transparent-bg border-1 border-transparent ml-1/5 mt-3/10 fixed top-3/10 z-230 focus:outline-0';
  }

  if (name === 'finallyreact_sidenav__top') {
    value += ' black-bg rounded-2 block h-1/5 mb-3/10 transition-2-ease-all w-2';

    if (open) {
      value += ' transform-origin-15 rotate-45';
    } else {
      value += ' rotate-0';
    }
  } else if (name === 'finallyreact_sidenav__mid') {
    value += ' black-bg rounded-2 block h-1/5 mb-3/10 rotate-0 transition-2-ease-all w-2';

    if (open) {
      value += ' opacity-0';
    }
  } else if (name === 'finallyreact_sidenav__bot') {
    value += ' black-bg rounded-2 block h-1/5 mb-3/10 transition-2-ease-all w-2';

    if (open) {
      value += ' transform-origin-15-95 -rotate-45';
    } else {
      value += ' rotate-0';
    }
  }

  return filterClassName(value, custom);
}
