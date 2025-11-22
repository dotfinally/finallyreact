import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { getFinallyConfig, omit } from '@util/index';
import { getClassName } from './SliderStyles';

export interface SliderProps extends HTMLAttributes<any> {
  min?: number;
  max?: number;
  step?: number;
  value?: number; // controlled value
  initialValue?: number; // uncontrolled initial value
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  simple?: boolean;
}

const omitValues = ['initialValue', 'noColorChange', 'onAfterChange', 'ariaLabel', 'readOnly', 'disabled', 'simple'];

export function Slider(props: SliderProps) {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  const step = props.step ?? 1;
  const controlledValue = props.value;
  const initialValue = props.initialValue;
  const name = props.name;
  const id = props.id;
  const className = props.className;

  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;
  const disabled = props.disabled || props.readOnly;

  const isControlled = controlledValue !== undefined;

  const initial = useMemo(() => {
    if (isControlled) return controlledValue!;
    if (initialValue !== undefined) return clamp(initialValue, min, max);
    return clamp(min, min, max);
  }, [isControlled, controlledValue, initialValue, min, max]);

  const [internalValue, setInternalValue] = useState<number>(initial);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue!);
    }
  }, [isControlled, controlledValue]);

  const currentValue = isControlled ? controlledValue! : internalValue;

  const handleChange = (e: any) => {
    const raw = e?.target?.value;
    const num = Number(raw);
    if (Number.isNaN(num)) return;
    const aligned = alignToStep(clamp(num, min, max), min, step);
    if (!isControlled) {
      setInternalValue(aligned);
    }

    const newEvent = {
      ...e,
      target: {
        ...(('target' in e && e.target) || {}),
        value: aligned
      }
    };

    props?.onChange(newEvent);
  };

  const handleKeyDown = (e: any) => {
    if (disabled) return;

    let next = currentValue;
    const largeStep = Math.max(step, (max - min) / 10);

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = alignToStep(clamp(currentValue - step, min, max), min, step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = alignToStep(clamp(currentValue + step, min, max), min, step);
        break;
      case 'PageDown':
        next = alignToStep(clamp(currentValue - largeStep, min, max), min, step);
        break;
      case 'PageUp':
        next = alignToStep(clamp(currentValue + largeStep, min, max), min, step);
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      default:
        return;
    }

    e.preventDefault();

    if (!isControlled) setInternalValue(next);

    const newEvent = {
      ...e,
      target: {
        ...(('target' in e && e.target) || {}),
        value: Number(next)
      }
    };

    props?.onChange(newEvent);

    // keep native input in sync for a11y tools
    const target = e.currentTarget;
    target.value = String(next);
  };

  return (
    <input
      {...omit(props, omitValues)}
      id={id}
      name={name}
      type="range"
      min={min}
      max={max}
      step={step}
      value={currentValue}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      aria-label={props['aria-label'] ?? name ?? 'Slider'}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-disabled={disabled ?? undefined}
      role={props.role ?? 'slider'}
      className={getClassName({
        name: 'finallyreact-slider',
        props,
        simple,
        custom: className
      })}
    />
  );
}

// helpers
function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function alignToStep(value: number, min: number, step: number) {
  if (step <= 0) return value;
  const offset = value - min;
  const quantized = Math.round(offset / step) * step;
  return Number((min + quantized).toFixed(5));
}

export default Slider;
