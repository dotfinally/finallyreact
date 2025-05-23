import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { omit, dispatchChangeEvent, getFinallyConfig, checkHex } from '@util/index';
import { getClassName } from './CheckStyles';
import { XIcon } from '@icons/XIcon';

export interface CheckProps extends HTMLAttributes<any> {
  checkColor?: string;
  checked?: boolean;
  color?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fill?: boolean;
  inputProps?: HTMLAttributes<any>;
  label?: string;
  labelProps?: HTMLAttributes<any>;
  toggleProps?: HTMLAttributes<any>;
  name?: string;
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  toggle?: boolean;
}

const omitValues = [
  'checkColor',
  'checked',
  'color',
  'defaultChecked',
  'fill',
  'inputProps',
  'label',
  'labelProps',
  'toggleProps',
  'simple',
  'size',
  'toggle',
  'readOnly'
];

/**
 * Check component for displaying a checkbox or toggle.
 * @param props CheckProps
 */
export function Check(props: CheckProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;
  const size = props.size || 'md';

  const disabled = props.disabled || props.readOnly;

  const [checked, setChecked] = useState(props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== checked && !(props.defaultChecked != null && props.checked == null)) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  // Emit change event (mainly for form)
  useEffect(() => {
    if (!disabled) {
      dispatchChangeEvent(checked, props.name, props.id);
    }
  }, [checked]);

  function onChange(e) {
    if (!disabled) {
      const newValue = !checked;
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: newValue
        }
      };

      props.onChange?.(newEvent);
      setChecked(newValue);
    }
  }

  function onSimpleKeyDown(e) {
    if (e.key === 'Enter') {
      onChange(e);
    }
    props.onKeyDown?.(e);
  }

  if (simple) {
    return (
      <div
        {...omit(props, omitValues)}
        className={getClassName({
          name: 'finallyreact-check',
          props,
          simple,
          size,
          checked,
          custom: props.className
        })}
      >
        <input
          {...omit(props.inputProps, ['size', 'onChange'])}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onKeyDown={onSimpleKeyDown}
        />

        {props.label && (
          <label {...props.labelProps} htmlFor={props.id}>
            {props.label}
          </label>
        )}
      </div>
    );
  }

  const checkInput = (
    <div
      {...props.inputProps}
      className={getClassName({
        name: 'finallyreact-check__input',
        props,
        simple,
        size,
        checked,
        custom: props.inputProps?.className
      })}
      style={{
        borderColor: checkHex(props.color),
        color: checkHex(props.color)
      }}
    >
      <span
        className={getClassName({
          name: 'finallyreact-check__checkmark',
          props,
          simple,
          size,
          checked
        })}
        style={{
          borderColor: checkHex(props.color),
          color: checkHex(props.color)
        }}
      />
    </div>
  );

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      onChange(e);
    }
    props.onKeyDown?.(e);
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-check',
        props,
        simple,
        size,
        checked,
        custom: props.className
      })}
      onChange={onChange}
      onClick={onChange}
      role={props.toggle ? 'toggle' : 'checkbox'}
      aria-checked={checked}
      aria-label={props['aria-label'] ?? props.label ?? 'Loading'}
      aria-disabled={disabled}
      tabIndex={props.tabIndex ?? 0}
      onKeyDown={onKeyDown}
    >
      {props.toggle ? (
        <div
          {...(props.toggleProps || {})}
          className={getClassName({
            name: 'finallyreact-toggle__input',
            props,
            simple,
            size,
            checked,
            custom: props.toggleProps?.className
          })}
          style={{
            borderColor: checkHex(props.color),
            color: checkHex(props.color)
          }}
        >
          <div className="flex">
            {!checked && (
              <XIcon
                className={getClassName({
                  name: 'finallyreact-toggle__x',
                  props,
                  simple,
                  size,
                  checked
                })}
                color={props.color}
              />
            )}
            {checkInput}
          </div>
        </div>
      ) : (
        checkInput
      )}

      {props.label && (
        <label
          {...props.labelProps}
          htmlFor={props.id}
          className={getClassName({
            name: 'finallyreact-check__label',
            props,
            simple,
            size,
            checked,
            custom: props.labelProps?.className
          })}
        >
          {props.label}
        </label>
      )}
    </div>
  );
}

export default Check;
