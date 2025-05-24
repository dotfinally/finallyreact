import { filterClassName } from '@util/helpers/classFilter';
import { NavbarProps } from './Navbar';

export function getClassName({
  name,
  props,
  custom,
  isDefault,
  active,
  disabled,
  showMobileDropdown
}: {
  name: string;
  props: NavbarProps;
  custom?: string;
  isDefault?: boolean;
  active?: boolean;
  disabled?: boolean;
  showMobileDropdown?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-navbar') {
    if (isDefault) {
      value += ' h-3 w-full';
    }

    if (props.sticky) {
      value += ' fixed top-0 z-230';
    }
  }

  if (name === 'finallyreact-navbar__content') {
    value += ' align-center flex h-full justify-between';
  }

  if (name === 'finallyreact-navbar__logo') {
    value += ' py-0 px-1-1/2';
  }

  if (name === 'finallyreact-navbar__items_container') {
    value += ' align-center flex h-full w-full justify-between';
  }

  if (name === 'finallyreact-navbar__items') {
    value += ' align-center justify-center flex h-full w-full';

    if (showMobileDropdown) {
      value += ' none';
    }
  }

  if (name === 'finallyreact-navbar__item') {
    value += ' align-center pointer inline-flex h-full py-0 px-1';

    if (disabled) {
      value += ' cursor-default gray-5';
    } else {
      value += ' h-80 hover:border-b-5 hover:border-b-blue-4';
    }

    if (active) {
      value += ' border-b-5 border-b-ocean-3 semibold h-80';
    }
  }

  if (name === 'finallyreact-navbar__dropdown_item') {
    value += ' flex align-center pointer inline-table h-full py-0 px-1 relative';

    if (active) {
      value += ' border-b-5 border-b-ocean-3 semibold h-80';
    }
  }

  if (name === 'finallyreact-navbar__item-dropdown') {
    value += ' cloud-9-bg gray-2 absolute w-max-content top-2-1/2';
  }

  if (name === 'finallyreact-navbar__item-dropdown_item') {
    value += ' p-1 pointer';

    if (disabled) {
      value += ' cursor-default gray-5';
    } else {
      value += ' hover:border-l-5 hover:border-l-blue-4';
    }

    if (active) {
      value += ' border-l-5 border-ocean-3';
    }
  }

  if (name === 'finallyreact-navbar__mobile-dropdown') {
    value += ' gray-9 gray-2-bg z-230';

    if (!showMobileDropdown) {
      value += ' none';
    }
  }

  if (name === 'finallyreact-input__down-arrow') {
    value += ' mr-1/5';
  }

  return filterClassName(value, custom);
}
