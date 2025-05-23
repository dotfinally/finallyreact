import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { classnames, getFinallyConfig, omit } from '@util/index';
import { getClassName } from './TabsStyles';

export interface TabsProps extends Omit<HTMLAttributes<any>, 'onChange'> {
  activeTabProps?: HTMLAttributes<any>;
  activeTabValue?: any;
  contentProps?: HTMLAttributes<any>;
  defaultActiveTabValue?: any;
  disabled?: boolean;
  readOnly?: boolean;
  headerProps?: HTMLAttributes<any>;
  onChange?: (tab: TabProps) => void;
  simple?: boolean;
  tabProps?: HTMLAttributes<any>;
  tabs: TabProps[];
}

export interface TabProps extends HTMLAttributes<any> {
  activeProps?: HTMLAttributes<any>;
  disabled?: boolean;
  iconLeft?: any;
  iconRight?: any;
  label?: string;
  value: any;
}

const omitValues = [
  'activeTabProps',
  'activeTabValue',
  'contentProps',
  'defaultActiveTabValue',
  'disabled',
  'readOnly',
  'headerProps',
  'onChange',
  'simple',
  'tabProps',
  'tabs'
];

const omitTabValues = ['activeProps', 'disabled', 'iconLeft', 'iconRight', 'label', 'value'];

/**
 * Tabs component for displaying content in a tabbed container
 * @param props TabsProps
 */
export function Tabs(props: TabsProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const disabled = props.disabled || props.readOnly;

  const [activeTabValue, setActiveTabValue] = useState(props.defaultActiveTabValue || props.tabs[0].value);

  useEffect(() => {
    if (props.activeTabValue != null) {
      setActiveTabValue(props.activeTabValue);
    }
  }, [props.activeTabValue]);

  function onClickTab(tab: TabProps) {
    if (props.onChange) {
      props.onChange(tab);
    }

    if (props.activeTabValue == null) {
      setActiveTabValue(tab.value);
    }
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-tabs',
        props,
        simple,
        custom: props.className
      })}
      role={props.role || 'tablist'}
      tabIndex={props.tabIndex ?? 0}
      aria-label={props['aria-label'] ?? 'Tabs'}
      aria-disabled={disabled ?? false}
    >
      <div
        {...props.headerProps}
        className={getClassName({
          name: 'finallyreact-tabs__header',
          props,
          simple,
          custom: props.headerProps?.className
        })}
      >
        {props.tabs.map((tab, index) => {
          const isActive = tab.value === activeTabValue;

          return (
            <div
              {...omit(props.tabProps || {}, omitTabValues)}
              {...(isActive ? props.activeTabProps || {} : {})}
              {...omit(tab, omitTabValues)}
              className={getClassName({
                name: 'finallyreact-tabs__tab',
                props,
                simple,
                custom: isActive
                  ? tab.activeProps?.className || props.activeTabProps?.className
                  : props.headerProps?.className,
                isActive
              })}
              key={index}
              onClick={() => {
                if (disabled || tab.disabled) {
                  return;
                }

                onClickTab(tab);
              }}
              onKeyDown={(e) => {
                if (disabled || tab.disabled) {
                  return;
                }

                if (e.key === 'Enter') {
                  onClickTab(tab);
                }
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={tab.id ?? undefined}
              aria-labelledby={tab['aria-labelledby'] ?? tab.label ?? undefined}
              aria-disabled={tab.disabled ?? undefined}
              tabIndex={tab.tabIndex ?? tab.disabled ? -1 : 0}
            >
              {tab.iconLeft ?? null}
              {tab.label}
              {tab.iconRight ?? null}
            </div>
          );
        })}
      </div>

      <div
        {...(props.contentProps || {})}
        className={getClassName({
          name: 'finallyreact-tabs__content',
          props,
          simple,
          custom: props.contentProps?.className
        })}
      >
        {props.tabs.map((tab, index) => (
          <div
            {...omit(tab, omitTabValues)}
            className={getClassName({
              name: 'finallyreact-tabs__tab-content',
              props,
              simple,
              custom: props.contentProps?.className,
              isActive: tab.value === activeTabValue
            })}
            key={index}
          >
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
