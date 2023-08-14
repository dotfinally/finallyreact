import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { classnames, getFinallyConfig, omit, useWindowSize } from '@util/index';
import { TextInput, TextInputProps } from '@components/inputs/input/TextInput';

import { getClassName } from './SidenavStyles';

export interface SidenavProps extends HTMLAttributes<any> {
  activeKey?: string;
  categoryProps?: HTMLAttributes<any>;
  customContent?: React.ReactNode;
  hideMobileMenu?: boolean;
  itemProps?: HTMLAttributes<any>;
  items?: SidenavItemProps[];
  sidenavProps?: HTMLAttributes<any>;
  simple?: boolean;
  sticky?: boolean;
  withNavbar?: boolean;
  showSearch?: boolean;
  sidenavSearchProps?: TextInputProps;
}

export interface SidenavItemProps extends HTMLAttributes<any> {
  icon?: React.ReactNode;
  key?: any;
  label?: string;
  link?: string;
  type?: 'category' | 'item';
  items?: SidenavItemProps[];
  disabled?: boolean;
  render?: (item: SidenavItemProps) => React.ReactNode;
  alts?: string[];
}

const omitValues = [
  'activeKey',
  'categoryProps',
  'customContent',
  'hideMobileMenu',
  'itemProps',
  'items',
  'sidenavProps',
  'simple',
  'sticky',
  'withNavbar',
  'showSearch',
  'sidenavSearchProps'
];
const omitItemValues = ['icon', 'id', 'label', 'link', 'type', 'items', 'disabled', 'render', 'alts'];

/**
 * Sidenav component for left side navigation items.
 * @param props SidenavProps
 */
export function Sidenav(props: SidenavProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [activeKey, setActiveKey] = useState(props.activeKey || '');
  const [windowWidth, windowHeight, screenSize, isMobile] = useWindowSize();

  const [open, setOpen] = useState(!isMobile);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setActiveKey(props.activeKey || '');
  }, [props.activeKey]);

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const items = useMemo(() => {
    if (!props.items) {
      return null;
    }

    function getCategory(sidenavItem: SidenavItemProps, index: number) {
      const itemKey = sidenavItem.id || `finallyreact_sidenav__category-${index}`;

      return (
        <div
          {...props.categoryProps}
          key={itemKey}
          className={getClassName({
            name: 'finallyreact_sidenav__category',
            props,
            simple,
            custom: classnames(props.categoryProps?.className, sidenavItem.className),
            isMobile,
            open
          })}
        >
          <div
            className={getClassName({
              name: 'finallyreact_sidenav__category-label',
              props,
              simple,
              isMobile,
              open
            })}
            tabIndex={props.categoryProps?.tabIndex ?? 0}
            aria-label={sidenavItem.label}
          >
            {sidenavItem.label}
          </div>
          <div
            className={getClassName({
              name: 'finallyreact_sidenav__category-items',
              props,
              simple,
              isMobile,
              open
            })}
          >
            {sidenavItem.items.map((subItem, subIndex) => getItem(subItem, subIndex))}
          </div>
        </div>
      );
    }

    function getItem(sidenavItem: SidenavItemProps, index: number) {
      const itemKey = sidenavItem.id || `finallyreact_sidenav__item-${index}`;

      if (sidenavItem.render) {
        return (
          <div
            {...omit(props.itemProps, omitItemValues)}
            {...omit(sidenavItem, omitItemValues)}
            key={itemKey}
            className={getClassName({
              name: 'finallyreact_sidenav__item',
              props,
              simple,
              isMobile,
              open,
              active: activeKey === sidenavItem.key,
              disabled: sidenavItem.disabled,
              custom: classnames(props.itemProps?.className, sidenavItem.className)
            })}
            disabled={sidenavItem.disabled}
            onClick={() => {
              if (!sidenavItem.disabled && !sidenavItem.onClick && isMobile && open) {
                setOpen(false);
              }
            }}
          >
            {sidenavItem.render(sidenavItem)}
          </div>
        );
      }

      return (
        <a
          {...omit(props.itemProps, omitItemValues)}
          {...omit(sidenavItem, omitItemValues)}
          key={itemKey}
          className={getClassName({
            name: 'finallyreact_sidenav__item',
            props,
            simple,
            isMobile,
            open,
            active: activeKey === sidenavItem.key,
            disabled: sidenavItem.disabled,
            custom: classnames(props.itemProps?.className, sidenavItem.className)
          })}
          href={sidenavItem.disabled ? undefined : sidenavItem.link}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              sidenavItem.onClick?.(e);
            }
          }}
          disabled={sidenavItem.disabled}
          tabIndex={props.itemProps?.tabIndex ?? sidenavItem?.tabIndex ?? 0}
          aria-label={sidenavItem.label}
        >
          {sidenavItem.icon}
          <span>{sidenavItem.label}</span>
        </a>
      );
    }

    let filteredItems = props.items?.length ? [...props.items] : [];

    const searchValue = search?.toLowerCase().trim().replace(/\s/g, '');

    if (searchValue) {
      // loop through all categories and sub-items to build a new array of items that match the search
      // If a sub-item doesn't match the search, don't include that sub-item
      // If a category doesn't have any sub-items that match the search, don't include that category
      // unless the category itself is exactly the search, then include the category and all sub-items.
      // Each item can also have a list of alternative labels as 'alts' that will also be searched for categories and sub-items.
      filteredItems = filteredItems.reduce((acc: SidenavItemProps[], item: SidenavItemProps) => {
        if (item.type === 'category') {
          const categoryMatches = item.label?.toLowerCase().trim().replace(/\s/g, '').includes(searchValue);
          const categoryAltsMatch = item.alts?.some((alt) =>
            alt?.toLowerCase().trim().replace(/\s/g, '').includes(searchValue)
          );

          if (categoryMatches || categoryAltsMatch) {
            acc.push(item);
          } else {
            const subItems = item.items?.reduce((subAcc: SidenavItemProps[], subItem: SidenavItemProps) => {
              const subItemMatches = subItem.label?.toLowerCase().trim().replace(/\s/g, '').includes(searchValue);
              const subItemAltsMatch = subItem.alts?.some((alt) =>
                alt?.toLowerCase().trim().replace(/\s/g, '').includes(searchValue)
              );

              if (subItemMatches || subItemAltsMatch) {
                subAcc.push(subItem);
              }

              return subAcc;
            }, []);

            if (subItems?.length) {
              acc.push({
                ...item,
                items: subItems
              });
            }
          }
        } else {
          const itemMatches = item.label?.toLowerCase().trim().replace(/\s/g, '').includes(searchValue);
          const itemAltsMatch = item.alts?.some((alt) =>
            alt?.toLowerCase().trim().replace(/\s/g, '').includes(searchValue)
          );

          if (itemMatches || itemAltsMatch) {
            acc.push(item);
          }
        }

        return acc;
      }, []);
    }

    return filteredItems.map((item, index) => {
      if (item.type === 'category') {
        return getCategory(item, index);
      }

      return getItem(item, index);
    });
  }, [props.items, activeKey, search, isMobile, open]);

  const sidenavContent = (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-row',
        props,
        simple,
        custom: props.className,
        isMobile,
        open
      })}
      role="navigation"
      aria-label={props['aria-label'] ?? 'side navigation'}
    >
      {!isMobile && !props.sticky && (
        <div
          {...props.sidenavProps}
          className={getClassName({
            name: 'sidenav-collapse',
            props,
            simple,
            custom: props.sidenavProps?.className,
            isMobile,
            open
          })}
          onClick={() => setOpen(!open)}
        />
      )}
      {props.customContent ? (
        props.customContent
      ) : (
        <>
          {props.showSearch && (
            <TextInput
              {...(props.sidenavSearchProps || {})}
              className={getClassName({
                name: 'finallyreact_sidenav__search',
                props,
                simple,
                custom: props.sidenavSearchProps?.className,
                isMobile,
                open
              })}
              onChange={(e: any) => {
                props.sidenavSearchProps?.onChange?.(e);
                setSearch(e.target.value);
              }}
              tabIndex={props.sidenavSearchProps?.tabIndex ?? 0}
              aria-label={props.sidenavSearchProps?.['aria-label'] ?? 'search'}
              floatingPlaceholder={props.sidenavSearchProps?.floatingPlaceholder ?? false}
              showClear={props.sidenavSearchProps?.showClear ?? true}
              placeholder={props.sidenavSearchProps?.placeholder ?? 'Search'}
              value={search}
            />
          )}

          {items}
        </>
      )}
    </div>
  );

  if (isMobile && !props.hideMobileMenu && !props.simple && !props.customContent) {
    return (
      <div
        className={getClassName({
          name: 'finallyreact-sidenav__mobile',
          props,
          simple,
          custom: props.className,
          isMobile,
          open
        })}
      >
        <button
          className={getClassName({
            name: 'finallyreact_sidenav__toggle',
            props
          })}
          onClick={() => setOpen(!open)}
        >
          <span
            className={getClassName({
              name: 'finallyreact_sidenav__top',
              props,
              open
            })}
          ></span>
          <span
            className={getClassName({
              name: 'finallyreact_sidenav__mid',
              props,
              open
            })}
          ></span>
          <span
            className={getClassName({
              name: 'finallyreact_sidenav__bot',
              props,
              open
            })}
          ></span>
        </button>

        {open && sidenavContent}
      </div>
    );
  }

  if (!isMobile) {
    return sidenavContent;
  }

  return null;
}

export default Sidenav;
