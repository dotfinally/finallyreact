import React, { HTMLAttributes, useEffect, useMemo, useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { omit, dispatchChangeEvent, getFinallyConfig, checkHex } from '@util/index';
import { getClassName } from './CheckStyles';
import { XIcon } from '@icons/XIcon';

export interface CheckOption extends Partial<CheckProps> {
  key: string;
  label: string;
  checked?: boolean;
  showOnlySelect?: boolean;
  onlySelectText?: string;
  onlySelectProps?: HTMLAttributes<any>;
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
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const isGroup = Array.isArray(originalProps.options) && originalProps.options.length > 0;

  // these derive from the *global* props
  const finallySimple = useMemo(() => getFinallyConfig().simple, []);
  const disabled = originalProps.disabled || originalProps.readOnly;

  // single‐checkbox state
  const [checked, setChecked] = useState<boolean>(originalProps.defaultChecked ?? originalProps.checked ?? false);
  useEffect(() => {
    if (
      !isGroup &&
      originalProps.checked !== undefined &&
      originalProps.checked !== checked &&
      !(originalProps.defaultChecked != null && originalProps.checked == null)
    ) {
      setChecked(originalProps.checked);
    }
  }, [originalProps.checked]);

  // dispatch global change event
  useEffect(() => {
    if (!disabled && !isGroup) {
      dispatchChangeEvent(checked, originalProps.name, originalProps.id);
    }
  }, [checked]);

  const handleKeyDown = (e: KeyboardEvent<any>, index?: number) => {
    if (e.key === 'Enter') {
      index != null ? handleOneChange(e, index) : handleChange(e);
    }

    originalProps.onKeyDown?.(e);
  };

  // group state: array of CheckOption with their own checked flags
  const [groupOpts, setGroupOpts] = useState<CheckOption[]>(
    () =>
      originalProps.options?.map((o) => ({
        ...(o || ({} as any)),
        checked: o?.checked != null ? !!o.checked : o?.defaultChecked ?? undefined
      })) ?? []
  );

  useEffect(() => {
    if (isGroup) {
      setGroupOpts(
        originalProps.options!.map((o) => ({
          ...o,
          checked: o?.checked != null ? !!o.checked : o?.defaultChecked ?? undefined
        }))
      );
    }
  }, [originalProps.options]);

  const handleChange = (e: ChangeEvent<any> | MouseEvent<any>, forced?: boolean) => {
    if (disabled) {
      return;
    }

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

  const handleOneChange = (e: ChangeEvent<any> | MouseEvent<any>, idx: number) => {
    const currentDisabled = groupOpts[idx].readOnly || groupOpts[idx].disabled;
    if (currentDisabled) return;

    const curr = groupOpts[idx].checked ?? false;

    // if it's a real <input type="checkbox" />, read e.target.checked
    const newVal =
      'target' in e && (e.target as HTMLInputElement).checked !== undefined
        ? (e.target as HTMLInputElement).checked
        : curr != null
        ? !curr
        : true;

    const nextArr = groupOpts.map((opt, i) => (i === idx ? { ...opt, checked: newVal } : opt));
    setGroupOpts(nextArr);

    const synthetic = {
      ...e,
      target: {
        ...(('target' in e && e.target) || {}),
        value: nextArr
      }
    };

    originalProps.onChange?.(synthetic as any);
    dispatchChangeEvent(nextArr, originalProps.name, originalProps.id);
  };

  // NEW: handle "only" logic
  const handleOnlySelect = (e: MouseEvent<any> | KeyboardEvent<any>, idx: number) => {
    e.stopPropagation();
    if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Enter') {
      return;
    }

    const currentDisabled = groupOpts[idx].readOnly || groupOpts[idx].disabled;
    if (currentDisabled) return;

    // set only the selected one to true, others to false
    const nextArr = groupOpts.map((opt, i) => ({
      ...opt,
      checked: i === idx
    }));
    setGroupOpts(nextArr);

    const synthetic = {
      ...e,
      target: {
        ...('target' in e && e.target ? e.target : {}),
        value: nextArr
      }
    };

    originalProps.onChange?.(synthetic as any);
    dispatchChangeEvent(nextArr, originalProps.name, originalProps.id);
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
    optProps?: CheckProps,
    checkOption?: CheckOption,
    isHover?: boolean,
    idx?: number
  ) => {
    // merged view props
    const p: CheckProps = {
      ...(originalProps || {}),
      ...(optProps || {}),
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
          {labelText && <label {...(p.labelProps || {})}>{labelText}</label>}
          {checkOption?.showOnlySelect && (
            <div
              {...(checkOption.onlySelectProps || {})}
              onClick={(e) => handleOnlySelect(e, idx!)}
              onKeyDown={(e) => handleOnlySelect(e, idx!)}
              role="button"
              tabIndex={0}
            >
              {checkOption.onlySelectText || 'only'}
            </div>
          )}
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
        {checkOption?.showOnlySelect ? (
          <div
            className={getClassName({
              name: 'finallyreact-check__label-with-only',
              props: p,
              simple: pSimple,
              size: pSize,
              checked: isChecked,
              custom: p.labelProps?.className
            })}
          >
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
            <div
              {...(checkOption.onlySelectProps || {})}
              className={getClassName({
                name: 'finallyreact-check__only-select',
                props: checkOption.onlySelectProps,
                custom: checkOption.onlySelectProps?.className,
                isHover
              })}
              onClick={(e) => handleOnlySelect(e, idx!)}
              onKeyDown={(e) => handleOnlySelect(e, idx!)}
              role="button"
              tabIndex={0}
            >
              {checkOption.onlySelectText || 'only'}
            </div>
          </div>
        ) : labelText ? (
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
        ) : null}
      </div>
    );
  };

  if (isGroup) {
    // strip out props that shouldn't go on the container
    const containerProps = omit(originalProps, omitValues) as HTMLAttributes<any>;

    return (
      <div
        {...(containerProps || {})}
        onMouseLeave={(e: any) => {
          setHoverKey(null);
          containerProps?.onMouseLeave?.(e);
        }}
      >
        {groupOpts.map((opt, idx) => {
          return (
            <div key={opt.key} onMouseEnter={() => setHoverKey(opt.key)}>
              {renderOne(
                opt.checked != null ? !!opt.checked : opt.defaultChecked ?? undefined,
                (e) => handleOneChange(e, idx),
                (e) => handleKeyDown(e, idx),
                opt.label,
                omit(opt, ['key', 'label', 'checked', 'showOnlySelect']) as CheckProps,
                opt,
                hoverKey === opt.key,
                idx
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // single checkbox
  return renderOne(checked, handleChange, handleKeyDown, originalProps.label, null, null, false, undefined);
}

export default Check;
