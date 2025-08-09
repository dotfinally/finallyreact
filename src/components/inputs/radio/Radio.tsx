import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { classnames, dispatchChangeEvent, getFinallyConfig, omit } from '@util/index';

import { getClassName } from './RadioStyles';

export interface RadioProps extends HTMLAttributes<any> {
  color?: string;
  initialValue?: string | any[];
  disabled?: boolean;
  readOnly?: boolean;
  inputProps?: HTMLAttributes<any>;
  labelProps?: HTMLAttributes<any>;
  name?: string;
  options: RadioOptionProps[];
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: any | any[];
  multiSelect?: boolean;
  onChange?: (e: any) => void;
  /** If false, clicking a selected single option won't unselect it. Default true */
  allowUnselect?: boolean;
}

export interface RadioOptionProps extends HTMLAttributes<any> {
  label: string;
  value: any;
  disabled?: boolean;
  readOnly?: boolean;
  /** If false, this specific option cannot be unselected in multi mode. Default inherits global */
  allowUnselect?: boolean;
}

const omitValues = [
  'color',
  'initialValue',
  'disabled',
  'readOnly',
  'inputProps',
  'labelProps',
  'name',
  'options',
  'simple',
  'size',
  'value',
  'multiSelect',
  'allowUnselect'
];

const omitRadioOptionValues = ['label', 'value', 'disabled', 'readOnly', 'allowUnselect'];

export function Radio(props: RadioProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;
  const disabled = props.disabled || props.readOnly;
  const multi = props.multiSelect || false;
  const size = props.size || 'md';
  // default allowUnselect to true
  const allowUnselectGlobal = props.allowUnselect !== false;

  // internal state: either a single value or an array
  const [selected, setSelected] = useState<any>(() => {
    if (multi) {
      return Array.isArray(props.value) ? props.value : Array.isArray(props.initialValue) ? props.initialValue : [];
    }
    return props.value ?? props.initialValue ?? undefined;
  });

  // Sync props.value -> internal state
  useEffect(() => {
    if (multi) {
      const incoming = Array.isArray(props.value) ? props.value : [];
      if (JSON.stringify(incoming) !== JSON.stringify(selected)) {
        setSelected(incoming);
      }
    } else {
      if (props.value !== selected) {
        setSelected(props.value ?? props.initialValue ?? undefined);
      }
    }
  }, [props.value]);

  // dispatch change event on every selection change
  useEffect(() => {
    if (!disabled) {
      dispatchChangeEvent(selected, props.name, props.id);
    }
  }, [selected]);

  function onChange(e: any, optionValue: any, option?: RadioOptionProps) {
    if (disabled) return;

    // Determine per-option allowUnselect, falling back to global
    const allowUnselectOption = option?.allowUnselect !== undefined ? option.allowUnselect : allowUnselectGlobal;

    if (multi) {
      const currentArray = Array.isArray(selected) ? selected : [];
      const idx = currentArray.indexOf(optionValue);

      // removal
      if (idx >= 0) {
        if (!allowUnselectOption) {
          return;
        }
        const next = [...currentArray.slice(0, idx), ...currentArray.slice(idx + 1)];
        setSelected(next);
        props.onChange?.({
          ...e,
          target: { value: next }
        });
      }
      // addition
      else {
        const next = [...currentArray, optionValue];
        setSelected(next);
        props.onChange?.({
          ...e,
          target: { value: next }
        });
      }
    } else {
      // single-select
      if (selected === optionValue) {
        if (!allowUnselectOption) {
          return;
        }
        setSelected(null);
        props.onChange?.({
          ...e,
          target: { value: null }
        });
      } else {
        setSelected(optionValue);
        props.onChange?.({
          ...e,
          target: { value: optionValue }
        });
      }
    }
  }

  function getOptions() {
    return props.options.map((option, index) => {
      const { label, value } = option;
      const isChecked = multi ? Array.isArray(selected) && selected.includes(value) : value === selected;
      const dis = disabled || option.disabled || option.readOnly;

      return (
        <div
          {...omit(option, omitRadioOptionValues)}
          key={index}
          className={getClassName({
            name: 'finallyreact-radio__option',
            props,
            simple,
            disabled: dis,
            size,
            checked: isChecked
          })}
          onClick={(e) => !dis && onChange(e, value, option)}
          aria-checked={isChecked}
          aria-label={label}
          tabIndex={option.tabIndex ?? 0}
          onKeyDown={(e) => {
            option.onKeyDown?.(e);
            if (e.key === 'Enter' && !dis) {
              onChange(e, value, option);
            }
          }}
        >
          {simple ? (
            <input
              {...(props.inputProps || {})}
              type={multi ? 'checkbox' : 'radio'}
              className={getClassName({
                name: 'finallyreact-radio__input',
                props,
                simple,
                disabled: dis,
                size,
                custom: props.inputProps?.className
              })}
              checked={isChecked}
              disabled={dis}
              value={value}
            />
          ) : (
            <div
              {...(props.inputProps || {})}
              className={getClassName({
                name: 'finallyreact-radio__input',
                props,
                simple,
                disabled: dis,
                size,
                checked: isChecked,
                custom: props.inputProps?.className
              })}
              aria-checked={isChecked}
            />
          )}

          <span
            {...(props.labelProps || {})}
            className={getClassName({
              name: 'finallyreact-radio__label',
              props,
              simple,
              disabled: dis,
              size,
              checked: isChecked,
              custom: props.labelProps?.className
            })}
          >
            {label}
          </span>
        </div>
      );
    });
  }

  if (!props.options?.length) {
    console.warn('Void Radio: no options provided');
    return null;
  }

  return (
    <div
      {...omit(props, omitValues)}
      name={props.name}
      className={classnames(
        'finallyreact-radio',
        disabled && 'disabled',
        simple && 'simple',
        multi && 'multi-select',
        props.className
      )}
      role={multi ? 'group' : props.role ?? 'radio'}
    >
      {getOptions()}
    </div>
  );
}

export default Radio;
