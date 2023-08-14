import React, { HTMLAttributes, useMemo } from 'react';
import { classnames, dispatchSubmitEvent, omit, getFinallyConfig } from '@util/index';
import { getClassName } from './ButtonStyles';

export interface ButtonProps extends HTMLAttributes<any> {
  borderColor?: string;
  color?: string;
  disabled?: boolean;
  name?: string;
  noColorChange?: boolean;
  rounded?: boolean;
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  submit?: boolean;
  text?: string;
}

const omitValues = ['borderColor', 'color', 'noColorChange', 'onClick', 'rounded', 'simple', 'size', 'submit', 'text'];

/**
 * Button component for displaying a button.
 * @param props ButtonProps
 */
export function Button(props: ButtonProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const size = props.simple ? props.size : props.size || 'md';
  const borderColor = props.borderColor ? props.borderColor : props.simple ? props.color : props.color || 'black';
  const backgroundColor = props.simple ? props.color : props.color || 'white';

  const baseColor = props.color?.split('-')[0] || 'gray';

  let colorNumber = Number(props.color?.split('-')[1] || 0);

  if (colorNumber === 10) {
    colorNumber = 8;
  }

  const darkColor = baseColor ? `${baseColor}-${colorNumber + 1}` : null;
  const darkerColor = baseColor ? `${baseColor}-${colorNumber + 2}` : null;

  const borderColorSplit = borderColor?.split('-');
  let darkBorderColor = borderColor;
  let darkerBorderColor = borderColor;
  if (borderColorSplit?.length === 2) {
    darkBorderColor = `${borderColorSplit[0]}-${Number(borderColorSplit[1]) + 1}`;
  }
  if (borderColorSplit?.length === 2) {
    darkerBorderColor = `${borderColorSplit[0]}-${Number(borderColorSplit[1]) + 2}`;
  }

  function onClick(e) {
    if (props.onClick && !props.disabled) {
      props.onClick(e);
    }

    if (props.submit && !props.disabled) {
      dispatchSubmitEvent(props.id || props.name);
    }
  }

  const additionalClasses = classnames(
    'border-1',
    borderColor && `border-${borderColor}`,
    backgroundColor && `${backgroundColor}-bg`,
    !props.disabled && darkColor && !props.noColorChange && `hover:${darkColor}-bg`,
    !props.disabled && darkColor && !props.noColorChange && `hover:border-${darkBorderColor}`,
    !props.disabled && darkerColor && !props.noColorChange && `active:${darkerColor}-bg`,
    !props.disabled && darkerColor && !props.noColorChange && `active:border-${darkerBorderColor}`,
    props.className
  );

  return (
    <button
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-button',
        props,
        simple,
        additionalClasses,
        custom: props.className,
        size
      })}
      onClick={onClick}
      role={props.role ?? 'button'}
      aria-label={props['aria-label'] ?? props.text ?? 'Button'}
      aria-disabled={props['aria-disabled'] ?? props.disabled}
      disabled={props.simple ? props.disabled : undefined}
    >
      {props.text}
    </button>
  );
}

export default Button;
