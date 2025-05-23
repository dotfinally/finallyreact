import React, { useState, useEffect, HTMLAttributes, useMemo } from 'react';
import {
  dispatchChangeEvent,
  formatNumber,
  getFinallyConfig,
  isNumber,
  omit,
  toNumber,
  unformatLocaleNumber
} from '@util/index';
import { getClassName } from './InputStyles';

export interface NumberInputProps extends HTMLAttributes<any> {
  clearProps?: HTMLAttributes<any>;
  color?: string;
  currency?: string;
  customClear?: React.ReactNode;
  decimals?: number;
  disabled?: boolean;
  floatingPlaceholder?: boolean;
  initialValue?: number;
  inputProps?: HTMLAttributes<any>;
  labelProps?: HTMLAttributes<any>;
  leftIcon?: any;
  leftLabel?: string;
  leftLabelProps?: HTMLAttributes<any>;
  locale?: string;
  max?: number;
  maxDecimals?: number;
  min?: number;
  minDecimals?: number;
  name?: string;
  onClear?: () => void;
  outline?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  rightIcon?: any;
  rightLabel?: string;
  rightLabelProps?: HTMLAttributes<any>;
  rounded?: boolean;
  showClear?: boolean;
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'number' | 'currency' | 'percent';
  value?: number;
  disableFormat?: boolean;
  round?: 'round' | 'ceil' | 'floor' | 'truncate';
}

const omitValues = [
  'clearProps',
  'color',
  'currency',
  'customClear',
  'decimals',
  'disabled',
  'floatingPlaceholder',
  'initialValue',
  'inputProps',
  'labelProps',
  'leftIcon',
  'leftLabel',
  'leftLabelProps',
  'locale',
  'max',
  'maxDecimals',
  'min',
  'minDecimals',
  'onClear',
  'outline',
  'placeholder',
  'readOnly',
  'rightIcon',
  'rightLabel',
  'rightLabelProps',
  'rounded',
  'showClear',
  'simple',
  'size',
  'type',
  'value',
  'disableFormat',
  'round'
];

/**
 * NumberInput component for displaying a number input. Includes formatting for currency, percent, and number,
 * validation for min and max, decimal precision, locales, and more.
 * @param props NumberInputProps
 */
export function NumberInput(props: NumberInputProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const disabled = props.disabled || props.readOnly;

  const [formattedValue, setFormattedValue] = useState<string>(format(props.value) ?? '');
  const [numberValue, setNumberValue] = useState<number>(toNumber(props.value));
  const [focused, setFocused] = useState<boolean>(false);
  const [lastValidValue, setLastValidValue] = useState<number>(props.value);

  useEffect(() => {
    if (props.value == null && props.initialValue != null) {
      setFormattedValue(format(props.initialValue) ?? '');
      setNumberValue(toNumber(props.initialValue));
      setLastValidValue(props.initialValue);
    }
  }, []);

  useEffect(() => {
    setFormattedValue(format(props.value) ?? '');
    setNumberValue(toNumber(props.value));
    setLastValidValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (props.value != null) {
      const formattedValue = format(props.value) ?? '';
      const unformattedValue = unformatLocaleNumber(formattedValue, props.locale);
      setFormattedValue(formattedValue);
      setNumberValue(toNumber(unformattedValue));
    } else if (props.initialValue != null) {
      const formattedValue = format(props.initialValue) ?? '';
      const unformattedValue = unformatLocaleNumber(formattedValue, props.locale);
      setFormattedValue(formattedValue);
      setNumberValue(toNumber(unformattedValue));
      setLastValidValue(props.initialValue);
    } else {
      const formattedValue = format(numberValue) ?? '';
      const unformattedValue = unformatLocaleNumber(formattedValue, props.locale);
      setFormattedValue(formattedValue);
      setNumberValue(toNumber(unformattedValue));
    }
  }, [
    props.type,
    props.currency,
    props.locale,
    props.max,
    props.min,
    props.maxDecimals,
    props.minDecimals,
    props.decimals,
    props.round
  ]);

  // Emit change event when numberValue changes (for Form)
  useEffect(() => {
    if (!disabled) {
      dispatchChangeEvent(numberValue, props.name, props.id);
    }
  }, [numberValue]);

  function format(value) {
    return formatNumber({
      value,
      type: props.type,
      locale: props.locale,
      currency: props.currency,
      min: props.min,
      max: props.max,
      decimals: props.decimals,
      minDecimals: props.minDecimals,
      maxDecimals: props.maxDecimals,
      round: props.round
    });
  }

  function onFocus() {
    setFocused(true);
  }

  // emit the raw number value on change
  function onChange(e) {
    const changeValue = e?.target.value;
    const unformattedChangeValue = unformatLocaleNumber(e.target.value, props.locale);
    setNumberValue(changeValue);

    if (isNumber(unformattedChangeValue) || !changeValue) {
      setLastValidValue(unformattedChangeValue);
    }

    if (props.onChange && !disabled) {
      const changeNumberValue = toNumber(unformattedChangeValue);

      props.onChange({
        ...e,
        target: {
          ...e.target,
          value: changeNumberValue,
          formattedValue: changeValue
        }
      });
    }

    // stop all other actions from emitting on blur
    e?.stopPropagation?.();
  }

  // emit the raw number value on blur
  function onBlur(e) {
    if (disabled) {
      return;
    }

    const formatted = format(isNumber(numberValue) ? numberValue : lastValidValue);
    const unformattedBlurValue = unformatLocaleNumber(formatted, props.locale);

    setFocused(false);
    setNumberValue(unformattedBlurValue);
    setFormattedValue(formatted ?? '');

    if (!disabled) {
      props.onBlur?.({
        ...e,
        target: {
          ...e.target,
          value: unformattedBlurValue,
          formattedValue: formatted
        }
      });
    }

    // stop all other actions from emitting on blur
    e?.stopPropagation?.();
  }

  function onClear(e) {
    if (disabled) {
      return;
    }

    setNumberValue(undefined);
    setFormattedValue('');
    setLastValidValue(undefined);

    if (!disabled) {
      onChange?.({
        ...e,
        target: {
          ...e.target,
          value: undefined,
          formattedValue: ''
        }
      });
      props.onClear?.();
    }
  }

  if (props.hidden) {
    return null;
  }

  return (
    <>
      {props.leftIcon && props.leftIcon}
      {props.leftLabel && (
        <span
          {...(props.leftLabelProps || {})}
          className={getClassName({
            name: 'finallyreact-input__label_left',
            props,
            simple,
            custom: props.leftLabelProps?.className
          })}
          tabIndex={props.leftLabelProps?.tabIndex ?? 0}
          aria-label={props.leftLabelProps?.['aria-label'] ?? 'Left Label for number input'}
        >
          {props.leftLabel}
        </span>
      )}

      <div
        {...omit(props, omitValues)}
        className={getClassName({
          name: 'finallyreact-input',
          props,
          simple,
          custom: props.className,
          active: !!formattedValue
        })}
        role={props.role ?? 'input'}
        aria-labelledby={props['aria-labelledby'] ?? props.leftLabelProps?.id ?? props.rightLabelProps?.id ?? undefined}
        aria-disabled={props['aria-disabled'] ?? disabled}
        aria-valuemin={props['aria-valuemin'] ?? props.min}
        aria-valuemax={props['aria-valuemax'] ?? props.max}
        aria-valuenow={props['aria-valuenow'] ?? numberValue}
        tabIndex={props.tabIndex ?? (disabled) ? 0 : undefined}
      >
        {disabled ? (
          <div
            {...props.inputProps}
            className={getClassName({
              name: 'finallyreact-input__box',
              props,
              simple,
              custom: props.inputProps?.className,
              active: !!formattedValue,
              focused
            })}
          >
            {props.disableFormat ? numberValue : formattedValue}
          </div>
        ) : (
          <input
            {...props.inputProps}
            className={getClassName({
              name: 'finallyreact-input__box',
              props,
              simple,
              custom: props.inputProps?.className
            })}
            disabled={disabled ?? false}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={props.simple ? props.placeholder : undefined}
            type="text"
            value={
              disabled
                ? formattedValue
                : focused
                ? numberValue ?? ''
                : props.disableFormat
                ? numberValue ?? ''
                : formattedValue
            }
          />
        )}

        {props.showClear &&
          !disabled &&
          numberValue != null &&
          (props.customClear ? (
            props.customClear
          ) : (
            <span
              {...props.clearProps}
              className={getClassName({
                name: 'finallyreact-input__clear',
                props,
                simple,
                custom: props.clearProps?.className
              })}
              onClick={onClear}
              tabIndex={0}
              onKeyDown={(e) => {
                props.clearProps?.onKeyDown?.(e);
                if (e.key === 'Enter') {
                  onClear(e);
                }
              }}
            />
          ))}

        {props.placeholder && !props.simple && (
          <div
            {...props.labelProps}
            className={getClassName({
              name: 'finallyreact-input__label',
              props,
              simple,
              custom: props.labelProps?.className,
              active: numberValue != null
            })}
          >
            {props.placeholder}
          </div>
        )}
      </div>

      {props.rightIcon && props.rightIcon}
      {props.rightLabel && (
        <span
          {...(props.rightLabelProps || {})}
          className={getClassName({
            name: 'finallyreact-input__label_right',
            props,
            simple,
            custom: props.rightLabelProps?.className
          })}
          tabIndex={props.rightLabelProps?.tabIndex ?? 0}
          aria-label={props.rightLabelProps?.['aria-label'] ?? 'Right Label for number input'}
        >
          {props.rightLabel}
        </span>
      )}
    </>
  );
}

export default NumberInput;
