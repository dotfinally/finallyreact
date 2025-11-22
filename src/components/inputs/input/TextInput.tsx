import React, { useState, useEffect, HTMLAttributes, useMemo } from 'react';
import {
  dispatchChangeEvent,
  dispatchCompositionEvent,
  formatMask,
  getFinallyConfig,
  omit,
  unformatMask,
  useAutoResizeTextarea
} from '@util/index';

import { Pop } from '../../display/pop/Pop';
import { getClassName } from './InputStyles';

export interface TextInputProps extends HTMLAttributes<any> {
  clearProps?: HTMLAttributes<any>;
  color?: string;
  customClear?: React.ReactNode;
  disabled?: boolean;
  dropdownProps?: HTMLAttributes<any>;
  dropdownArrowProps?: HTMLAttributes<any>;
  floatingPlaceholder?: boolean;
  initialValue?: string;
  inputProps?: HTMLAttributes<any> & {
    name?: string;
  };
  labelProps?: HTMLAttributes<any>;
  leftIcon?: any;
  leftLabel?: string;
  leftLabelProps?: HTMLAttributes<any>;
  mask?: string; // 111-111-1111
  name?: string;
  onClear?: () => void;
  outline?: boolean;
  passwordIcon?: any;
  passwordIconProps?: HTMLAttributes<any>;
  placeholder?: string;
  readOnly?: boolean;
  rightIcon?: any;
  rightLabel?: string;
  rightLabelProps?: HTMLAttributes<any>;
  rounded?: boolean;
  showClear?: boolean;
  showDropdown?: boolean;
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'textarea';
  value?: string;
  textAreaAutoHeight?: boolean;
}

const omitValues = [
  'clearProps',
  'color',
  'customClear',
  'disabled',
  'dropdownProps',
  'dropdownArrowProps',
  'floatingPlaceholder',
  'initialValue',
  'inputProps',
  'labelProps',
  'leftIcon',
  'leftLabel',
  'leftLabelProps',
  'mask',
  'onClear',
  'outline',
  'passwordIcon',
  'passwordIconProps',
  'placeholder',
  'readOnly',
  'rightIcon',
  'rightLabel',
  'rightLabelProps',
  'rounded',
  'showClear',
  'showDropdown',
  'simple',
  'size',
  'type',
  'value',
  'textAreaAutoHeight'
];

/**
 * Text input component, including options for masking and passwords.
 * @param props TextInputProps
 */
export function TextInput(props: TextInputProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const disabled = props.disabled || props.readOnly;

  const [value, setValue] = useState<string>(props.value ?? '');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const textAreaRef = useAutoResizeTextarea();

  useEffect(() => {
    if (props.value == null && props.initialValue != null) {
      setValue(props.initialValue ?? '');
    }
  }, []);

  useEffect(() => {
    if (props.value !== value && !(props.initialValue != null && props.value == null)) {
      setValue(props.value ?? '');
    }
  }, [props.value]);

  useEffect(() => {
    if (!disabled) {
      dispatchChangeEvent(value, props.name, props.id);
    }
  }, [value]);

  function onChange(e: any) {
    if (disabled) {
      return;
    }

    let changeValue = e?.target.value;
    let unformattedValue = '';

    if (props.mask && changeValue?.length > props.mask?.length) {
      changeValue = changeValue.slice(0, props.mask?.length);
    }

    if (props.mask && changeValue != null && changeValue !== '') {
      changeValue = formatMask(changeValue, props.mask);
      unformattedValue = unformatMask(changeValue, props.mask);
    }

    setValue(changeValue ?? '');

    if (!disabled) {
      props.onChange?.({
        ...e,
        target: {
          ...e.target,
          value: changeValue,
          rawValue: unformattedValue
        }
      });

      // stop the event from bubbling up
      e?.stopPropagation?.();
    }
  }

  function onKeyDown(e) {
    if (disabled) {
      return;
    }

    // if key is backspace and mask is set, then remove the last character
    if (e.key === 'Backspace' && props.mask) {
      const maskChar = props.mask.charAt(value?.length - 1);
      if (maskChar !== '1') {
        setValue(value.slice(0, -1) ?? '');
        props.onKeyDown?.(e);
        e?.preventDefault();
        return;
      }
    }

    props.inputProps?.onKeyDown?.(e);
  }

  // emit the state value on blur
  function onBlur(e) {
    if (disabled) {
      return;
    }

    if (!disabled) {
      props.onBlur?.({
        ...e,
        target: {
          ...e.target,
          value
        }
      });
    }
  }

  function onClear(e) {
    if (!disabled) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: ''
        }
      });

      props.onClear?.();
    }
  }

  const ariaLabelledBy = props['aria-labelledby'] ?? props.leftLabelProps?.id ?? props.rightLabelProps?.id ?? undefined;
  const ariaLabel = ariaLabelledBy ? undefined : props['aria-label'] ?? 'Text Input';

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
          aria-label={props.leftLabelProps?.['aria-label'] ?? 'Left Label for text input'}
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
          active: !!value
        })}
        aria-disabled={props['aria-disabled'] ?? disabled}
        tabIndex={props.tabIndex ?? disabled ? 0 : undefined}
      >
        {disabled ? (
          <div
            {...props.inputProps}
            className={getClassName({
              name: 'finallyreact-input__box',
              props,
              simple,
              custom: props.inputProps?.className,
              active: !!value
            })}
          >
            {value}
          </div>
        ) : props.type === 'textarea' ? (
          <textarea
            {...props.inputProps}
            ref={props.textAreaAutoHeight ? textAreaRef : null}
            className={getClassName({
              name: 'finallyreact-input__box',
              props,
              simple,
              custom: props.inputProps?.className,
              active: !!value
            })}
            disabled={disabled ?? false}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={props.simple ? props.placeholder : undefined}
            value={value}
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabel}
            onCompositionEnd={(e: any) => dispatchCompositionEvent(e?.target?.value, props.name, props.id)}
          />
        ) : (
          <input
            {...props.inputProps}
            className={getClassName({
              name: 'finallyreact-input__box',
              props,
              simple,
              custom: props.inputProps?.className,
              active: !!value
            })}
            disabled={disabled ?? false}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={props.simple ? props.placeholder : undefined}
            type={props.type === 'password' && !showPassword ? 'password' : 'text'}
            value={value}
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabel}
            onCompositionEnd={(e: any) => dispatchCompositionEvent(e?.target?.value, props.name, props.id)}
          />
        )}

        {props.showClear &&
          !disabled &&
          value != null &&
          value !== '' &&
          (props.customClear ? (
            props.customClear
          ) : (
            <span
              {...props.clearProps}
              className={getClassName({
                name: 'finallyreact-input__clear',
                props,
                simple,
                custom: props.clearProps?.className,
                active: !!value
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

        {props.showDropdown && !(props.showClear && !disabled && value) && (
          <div
            {...(props.dropdownProps || {})}
            className={getClassName({
              name: 'finallyreact-input__dropdown',
              props,
              simple,
              custom: props.dropdownProps?.className
            })}
            onClick={props.inputProps?.onClick}
          >
            <div
              {...(props.dropdownArrowProps || {})}
              className={getClassName({
                name: 'finallyreact-input__down-arrow',
                props,
                simple,
                custom: props.dropdownArrowProps?.className
              })}
            />
          </div>
        )}

        {props.placeholder && !props.simple && (
          <div
            {...props.labelProps}
            className={getClassName({
              name: 'finallyreact-input__label',
              props,
              simple,
              custom: props.labelProps?.className,
              active: !!value
            })}
          >
            {props.placeholder}
          </div>
        )}
      </div>

      {props.rightIcon && props.rightIcon}
      {!props.rightIcon &&
        props.type === 'password' &&
        (props.passwordIcon ? (
          props.passwordIcon
        ) : (
          <Pop
            text={showPassword ? 'Click to hide' : 'Click to show'}
            location="right"
            tooltipProps={{
              style: {
                marginLeft: '0.5rem'
              }
            }}
          >
            <div
              {...(props.passwordIconProps || {})}
              className={getClassName({
                name: 'finallyreact-input__password-toggle',
                props,
                simple,
                custom: props.passwordIconProps?.className,
                showToggle: showPassword
              })}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowPassword(!showPassword);
                }
              }}
            />
          </Pop>
        ))}
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
          aria-label={props.rightLabelProps?.['aria-label'] ?? 'Right Label for text input'}
        >
          {props.rightLabel}
        </span>
      )}
    </>
  );
}

export default TextInput;
