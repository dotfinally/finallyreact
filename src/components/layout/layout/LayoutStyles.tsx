import { filterClassName } from '@util/helpers/classFilter';
import { LayoutProps } from './Layout';

export function getClassName({
  name,
  props,
  custom,
  withNavbar,
  withNavbarFull,
  sideNavFull,
  isMobile
}: {
  name: string;
  props: LayoutProps;
  custom?: string;
  withNavbar?: boolean;
  withNavbarFull?: boolean;
  sideNavFull?: boolean;
  isMobile?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-layout__layout-content') {
    if (!isMobile) {
      value += ' w-full';
    }

    if (withNavbar) {
      value += ' pt-3';
    }

    if (withNavbarFull) {
      value += ' min-h-screen h-full';
    }
  }

  if (name === 'finallyreact-layout__content-with-sidenav') {
    value += ' flex';

    if (sideNavFull) {
      value += ' min-h-screen h-full';
    }
  }

  return filterClassName(value, custom);
}
