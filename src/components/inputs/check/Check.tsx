import React, {
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent
} from 'react';
import { omit, dispatchChangeEvent, getFinallyConfig, checkHex } from '@util/index';
import { getClassName } from './CheckStyles';
import { XIcon } from '@icons/XIcon';

export interface CheckOption extends Partial<CheckProps> {
  key: string;
  label: string;
  checked?: boolean;
}

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
  options?: CheckOption[];
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
  'readOnly',
  'options'
];

export function Check(originalProps: CheckProps) {
  const isGroup = Array.isArray(originalProps.options) && originalProps.options.length > 0;

  // these derive from the *global* props
  const finallySimple = useMemo(() => getFinallyConfig().simple, []);
  const simple = finallySimple || originalProps.simple;
  const size = originalProps.size || 'md';
  const disabled = originalProps.disabled || originalProps.readOnly;

  // single‐checkbox state
  const [checked, setChecked] = useState<boolean>(
    originalProps.defaultChecked ?? originalProps.checked ?? false
  );
  useEffect(() => {
    if (
      originalProps.checked !== undefined &&
      originalProps.checked !== checked &&
      !(originalProps.defaultChecked != null && originalProps.checked == null)
    ) {
      setChecked(originalProps.checked);
    }
  }, [originalProps.checked]);

  // dispatch global change event
  useEffect(() => {
    if (!disabled) {
      dispatchChangeEvent(checked, originalProps.name, originalProps.id);
    }
  }, [checked]);

  const handleChange = (e: ChangeEvent<any> | MouseEvent<any>, forced?: boolean) => {
    if (disabled) return;
    const newVal = forced ?? !checked;
    const newEvent = {
      ...e,
      target: {
        ...(('target' in e && e.target) || {}),
        value: newVal
      }
    };
    originalProps.onChange?.(newEvent as any);
    setChecked(newVal);
  };

  const handleKeyDown = (e: KeyboardEvent<any>) => {
    if (e.key === 'Enter') handleChange(e);
    originalProps.onKeyDown?.(e);
  };

  // group state: array of CheckOption with their own checked flags
  const [groupOpts, setGroupOpts] = useState<CheckOption[]>(
    () =>
      originalProps.options?.map((o) => ({
        ...o,
        checked: !!o.checked
      })) ?? []
  );
  useEffect(() => {
    if (isGroup) {
      setGroupOpts(
        originalProps.options!.map((o) => ({
          ...o,
          checked: !!o.checked
        }))
      );
    }
  }, [originalProps.options]);

  const handleOneChange = (e: ChangeEvent<any> | MouseEvent<any>, idx: number) => {
    const currentDisabled = groupOpts[idx].readOnly || groupOpts[idx].disabled;
    if (currentDisabled) return;

    const curr = groupOpts[idx].checked ?? false;
    // if it's a real <input type="checkbox" />, read e.target.checked
    const newVal =
      'target' in e && (e.target as HTMLInputElement).checked !== undefined
        ? (e.target as HTMLInputElement).checked
        : !curr;

    const nextArr = groupOpts.map((opt, i) =>
      i === idx ? { ...opt, checked: newVal } : opt
    );
    setGroupOpts(nextArr);

    // synthetic event: value = the new array of options
    const synthetic: any = {
      ...e,
      target: { ...(e as any).target, value: nextArr }
    };
    originalProps.onChange?.(synthetic);
  };

  /**
   * Renders one checkbox (or toggle) instance.  We merge:
   *   – the global props (originalProps)
   *   – any per‐option overrides (optProps)
   */
  const renderOne = (
    isChecked: boolean,
    onChange: (e: ChangeEvent<any> | MouseEvent<any>) => void,
    onKeyDown: (e: KeyboardEvent<any>) => void,
    labelText?: string,
    optProps: CheckProps = {}
  ) => {
    // merged view props
    const p: CheckProps = {
      ...originalProps,
      ...optProps,
      options: undefined
    };

    const pDisabled = p.disabled || p.readOnly;
    const pSimple = finallySimple || p.simple;
    const pSize = p.size || 'md';

    if (pSimple) {
      return (
        <div
          className={getClassName({
            name: 'finallyreact-check',
            props: p,
            simple: pSimple,
            size: pSize,
            checked: isChecked,
            custom: p.className
          })}
        >
          <input
            {...omit(p.inputProps, ['size', 'onChange'])}
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            onKeyDown={onKeyDown}
            disabled={pDisabled}
          />
          {labelText && <label {...p.labelProps}>{labelText}</label>}
        </div>
      );
    }

    const checkInput = (
      <div
        {...p.inputProps}
        className={getClassName({
          name: 'finallyreact-check__input',
          props: p,
          simple: pSimple,
          size: pSize,
          checked: isChecked,
          custom: p.inputProps?.className
        })}
        style={{
          borderColor: checkHex(p.color),
          color: checkHex(p.color)
        }}
      >
        <span
          className={getClassName({
            name: 'finallyreact-check__checkmark',
            props: p,
            simple: pSimple,
            size: pSize,
            checked: isChecked
          })}
          style={{
            borderColor: checkHex(p.color),
            color: checkHex(p.color)
          }}
        />
      </div>
    );

    return (
      <div
        {...omit(originalProps, omitValues)}
        className={getClassName({
          name: 'finallyreact-check',
          props: p,
          simple: pSimple,
          size: pSize,
          checked: isChecked,
          custom: p.className
        })}
        onClick={onChange}
        onKeyDown={onKeyDown}
        role={p.toggle ? 'toggle' : 'checkbox'}
        aria-checked={isChecked}
        aria-label={p['aria-label'] ?? labelText ?? 'Checkbox'}
        aria-disabled={pDisabled}
        tabIndex={p.tabIndex ?? 0}
      >
        {p.toggle ? (
          <div
            {...(p.toggleProps || {})}
            className={getClassName({
              name: 'finallyreact-toggle__input',
              props: p,
              simple: pSimple,
              size: pSize,
              checked: isChecked,
              custom: p.toggleProps?.className
            })}
            style={{
              borderColor: checkHex(p.color),
              color: checkHex(p.color)
            }}
          >
            <div className="flex">
              {!isChecked && (
                <XIcon
                  className={getClassName({
                    name: 'finallyreact-toggle__x',
                    props: p,
                    simple: pSimple,
                    size: pSize,
                    checked: isChecked
                  })}
                  color={p.color}
                />
              )}
              {checkInput}
            </div>
          </div>
        ) : (
          checkInput
        )}
        {labelText && (
          <label
            {...p.labelProps}
            className={getClassName({
              name: 'finallyreact-check__label',
              props: p,
              simple: pSimple,
              size: pSize,
              checked: isChecked,
              custom: p.labelProps?.className
            })}
          >
            {labelText}
          </label>
        )}
      </div>
    );
  };

  if (isGroup) {
    // strip out props that shouldn't go on the container
    const containerProps = omit(originalProps, omitValues) as HTMLAttributes<any>;

    return (
      <div {...containerProps}>
        {groupOpts.map((opt, idx) => (
          <div key={opt.key}>
            {renderOne(
              !!opt.checked,
              (e) => handleOneChange(e, idx),
              handleKeyDown,
              opt.label,
              // pass *all* opt fields as overrides, except key & label
              omit(opt, ['key', 'label', 'checked']) as CheckProps
            )}
          </div>
        ))}
      </div>
    );
  }

  // single checkbox
  return renderOne(checked, handleChange, handleKeyDown, originalProps.label);
}

export default Check;
