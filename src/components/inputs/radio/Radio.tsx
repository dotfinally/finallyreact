import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { classnames, dispatchChangeEvent, getFinallyConfig, omit } from '@util/index';

import { getClassName } from './RadioStyles';

export interface RadioProps extends HTMLAttributes<any> {
  color?: string;
  initialValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  inputProps?: HTMLAttributes<any>;
  labelProps?: HTMLAttributes<any>;
  name?: string;
  options: RadioOptionProps[];
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: any;
}

export interface RadioOptionProps extends HTMLAttributes<any> {
  label: string;
  value: any;
  disabled?: boolean;
  readOnly?: boolean;
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
  'value'
];

const omitRadioOptionValues = ['label', 'value', 'disabled', 'readOnly'];

/**
 * Radio component for selecting one option from a list.
 * @param props RadioProps
 */
export function Radio(props: RadioProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const disabled = props.disabled || props.readOnly;

  const [selectedValue, setSelectedValue] = useState(
    props.value == null ? props.initialValue : props.value == null ? undefined : props.value
  );

  const size = props.size || 'md';

  useEffect(() => {
    if (props.value !== selectedValue) {
      if (props.value == null && props.initialValue != null) {
        setSelectedValue(props.initialValue);
      } else {
        setSelectedValue(props.value);
      }
    }
  }, [props.value]);

  useEffect(() => {
    if (!disabled) {
      dispatchChangeEvent(selectedValue, props.name, props.id);
    }
  }, [selectedValue]);

  function onChange(e, value: any) {
    if (selectedValue !== value && !disabled) {
      setSelectedValue(value);

      props.onChange?.({
        ...e,
        target: {
          value
        }
      });
    }
  }

  function getOptions() {
    return props.options?.map((option, index) => {
      const { label, value } = option;
      const checked = value === selectedValue;
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
            size
          })}
          onClick={(e) => !dis && onChange(e, value)}
          aria-checked={props['aria-checked'] ?? checked}
          aria-label={props['aria-label'] ?? label}
          tabIndex={option.tabIndex ?? 0}
          onKeyDown={(e) => {
            option.onKeyDown?.(e);
            if (e.key === 'Enter' && !dis) {
              onChange(e, value);
            }
          }}
        >
          {props.simple ? (
            <input
              {...(props.inputProps || {})}
              type="radio"
              className={getClassName({
                name: 'finallyreact-radio__input',
                props,
                simple,
                disabled: dis,
                size,
                custom: props.inputProps?.className
              })}
              checked={checked}
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
                checked,
                custom: props.inputProps?.className
              })}
              aria-checked={props['aria-checked'] ?? checked}
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
              checked,
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
        props.simple && 'simple',
        props.className
      )}
      role={props.role ?? 'radio'}
    >
      {getOptions()}
    </div>
  );
}

export default Radio;
