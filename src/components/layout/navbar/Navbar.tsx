import React, { HTMLAttributes, useEffect, useState } from 'react';
import { classnames, omit, useWindowSize } from '@util/index';
import { Dropdown } from '@components/index';

import { getClassName } from './NavbarStyles';

export interface NavbarProps extends HTMLAttributes<any> {
  customContent?: React.ReactNode;
  sticky?: boolean;
  withSidenav?: boolean;
  logo?: string | React.ReactNode;
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  activeKey?: string;
  mobileDropdownProps?: HTMLAttributes<any>;
  items?: NavItemProps[];
}

interface NavItemProps {
  key: string;
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  itemProps?: HTMLAttributes<any>;
  disabled?: boolean;
  dropdownItems?: {
    key: string;
    label: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    itemProps?: HTMLAttributes<any>;
    disabled?: boolean;
    onClick?: () => void;
  }[];
}

const omitValues = [
  'customContent',
  'sticky',
  'withSidenav',
  'logo',
  'leftContent',
  'centerContent',
  'rightContent',
  'activeKey',
  'mobileDropdownProps',
  'items'
];

/**
 * Navbar component for top level navigation items.
 * @param props NavbarProps
 */
export function Navbar(props: NavbarProps) {
  const [activeKey, setActiveKey] = useState(props.activeKey || '');
  const [windowWidth, windowHeight, screenSize, isMobile] = useWindowSize();
  const showMobileDropdown = isMobile || screenSize === 'sm';

  useEffect(() => {
    setActiveKey(props.activeKey || '');
  }, [props.activeKey]);

  // get all items as a flat array
  function getMobileNavItems() {
    const items = [];

    props.items?.forEach((item) => {
      if (!item.dropdownItems) {
        items.push(item);
      } else if (item.dropdownItems) {
        items.push(...item.dropdownItems);
      }
    });

    return items;
  }

  function getDropdownNav(item: NavItemProps) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
      <div
        className={getClassName({
          name: 'finallyreact-navbar__dropdown_item',
          props,
          active: !!(item.key === activeKey || item.dropdownItems.find((i) => i.key === activeKey))
        })}
        onMouseEnter={() => {
          if (!showDropdown) {
            setShowDropdown(true);
          }
        }}
        onMouseLeave={() => {
          if (showDropdown) {
            setShowDropdown(false);
          }
        }}
        onFocus={() => {
          if (!showDropdown) {
            setShowDropdown(true);
          }
        }}
        key={item.key}
        tabIndex={0}
      >
        <div
          className={getClassName({
            name: 'finallyreact-navbar__item-label',
            props
          })}
        >
          {item.label}
        </div>

        {showDropdown && (
          <div
            className={getClassName({
              name: 'finallyreact-navbar__item-dropdown',
              props
            })}
          >
            {item.dropdownItems?.map((dropdownItem, index) => (
              <div
                {...(dropdownItem.itemProps || {})}
                className={getClassName({
                  name: 'finallyreact-navbar__item-dropdown_item',
                  props,
                  active: dropdownItem.key === activeKey,
                  disabled: dropdownItem.disabled,
                  custom: dropdownItem.itemProps?.className
                })}
                onClick={() => {
                  if (!dropdownItem.disabled) {
                    setActiveKey(dropdownItem.key);
                    dropdownItem.onClick?.();
                    setShowDropdown(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (!dropdownItem.disabled && e.key === 'Enter') {
                    setActiveKey(dropdownItem.key);
                    dropdownItem.onClick?.();
                    setShowDropdown(false);
                  }
                  if (e.key === 'Escape') {
                    setShowDropdown(false);
                  }
                  if (e.key === 'Tab') {
                    if (index === item.dropdownItems.length - 1) {
                      setShowDropdown(false);
                    }
                  }
                }}
                key={dropdownItem.key}
                tabIndex={0}
              >
                {dropdownItem.iconLeft && (
                  <div
                    className={getClassName({
                      name: 'finallyreact-navbar__item-dropdown_item-icon_left',
                      props
                    })}
                  >
                    {dropdownItem.iconLeft}
                  </div>
                )}
                {dropdownItem.label}
                {dropdownItem.iconRight && (
                  <div
                    className={getClassName({
                      name: 'finallyreact-navbar__item-dropdown_item-icon_right',
                      props
                    })}
                  >
                    {dropdownItem.iconRight}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-navbar',
        props,
        isDefault: !props.customContent,
        custom: props.className
      })}
      role={props.role ?? 'navigation'}
      aria-label={props['aria-label'] ?? 'top navigation'}
    >
      {props.customContent ? (
        props.customContent
      ) : (
        <div
          className={getClassName({
            name: 'finallyreact-navbar__content',
            props
          })}
        >
          {props.logo && (
            <div
              className={getClassName({
                name: 'finallyreact-navbar__logo',
                props
              })}
              tabIndex={0}
              aria-label="navbar logo"
            >
              {props.logo}
            </div>
          )}

          <div
            className={getClassName({
              name: 'finallyreact-navbar__items_container',
              props
            })}
          >
            {props.leftContent && (
              <div
                className={getClassName({
                  name: 'finallyreact-navbar__left',
                  props
                })}
              >
                {props.leftContent}
              </div>
            )}

            {props.centerContent ? (
              <div
                className={getClassName({
                  name: 'finallyreact-navbar__center',
                  props
                })}
              >
                {props.centerContent}
              </div>
            ) : (
              props.items?.length > 0 && (
                <>
                  <Dropdown
                    {...(props.mobileDropdownProps || {})}
                    className={getClassName({
                      name: 'finallyreact-navbar__mobile-dropdown',
                      props,
                      showMobileDropdown,
                      custom: props.mobileDropdownProps?.className
                    })}
                    color={props.mobileDropdownProps?.color ?? 'black'}
                    options={getMobileNavItems().map((item) => {
                      return {
                        label: item.label,
                        value: item.key,
                        disabled: item.disabled,
                        onChange: () => {
                          if (!item.disabled) {
                            setActiveKey(item.key);
                            item.onClick?.();
                          }
                        }
                      };
                    })}
                    value={activeKey}
                    select={true}
                    textInputProps={{
                      outline: false,
                      color: props.mobileDropdownProps?.color ?? 'black'
                    }}
                  />

                  <div
                    className={getClassName({
                      name: 'finallyreact-navbar__items',
                      props,
                      showMobileDropdown
                    })}
                  >
                    {props.items.map((item) => {
                      if (item.dropdownItems) {
                        return getDropdownNav(item);
                      }

                      return (
                        <div
                          {...(item.itemProps || {})}
                          className={getClassName({
                            name: 'finallyreact-navbar__item',
                            active: item.key === activeKey,
                            disabled: item.disabled,
                            props,
                            custom: item.itemProps?.className
                          })}
                          onClick={() => {
                            if (!item.disabled) {
                              setActiveKey(item.key);
                              item.onClick?.();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (!item.disabled && e.key === 'Enter') {
                              setActiveKey(item.key);
                              item.onClick?.();
                            }
                          }}
                          key={item.key}
                          tabIndex={item.itemProps?.tabIndex ?? 0}
                          aria-label={item.label || 'navbar item'}
                          aria-disabled={item.disabled}
                        >
                          {item.iconLeft && (
                            <div
                              className={getClassName({
                                name: 'finallyreact-navbar__item-icon',
                                props
                              })}
                            >
                              {item.iconLeft}
                            </div>
                          )}
                          <div
                            className={getClassName({
                              name: 'finallyreact-navbar__item-label',
                              props
                            })}
                          >
                            {item.label}
                          </div>
                          {item.iconRight && (
                            <div
                              className={getClassName({
                                name: 'finallyreact-navbar__item-icon',
                                props
                              })}
                            >
                              {item.iconRight}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )
            )}

            {props.rightContent && (
              <div
                className={getClassName({
                  name: 'finallyreact-navbar__right',
                  props
                })}
                aria-label="navbar right"
              >
                {props.rightContent}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
