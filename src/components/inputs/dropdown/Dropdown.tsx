import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { dispatchChangeValue, getFinallyConfig, omit, usePopover, isEqual } from '@util/index';

import TextInput, { TextInputProps } from '../input/TextInput';
import { getClassName } from './DropdownStyles';

export interface DropdownProps extends HTMLAttributes<any> {
  autoFilterOnSearch?: boolean;
  color?: string;
  initialValue?: any;
  disabled?: boolean;
  textInputProps?: TextInputProps;
  name?: string;
  onSearch?: (value: string) => void;
  optionContainerProps?: HTMLAttributes<any>;
  options?: IDropdownOption[];
  simple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: any;
  select?: boolean;
  placeholder?: string;
}

export interface IDropdownOption extends HTMLAttributes<any> {
  value: any;
  label: any;
  disabled?: boolean;
}

const omitValues = [
  'autoFilterOnSearch',
  'color',
  'initialValue',
  'disabled',
  'textInputProps',
  'onSearch',
  'optionContainerProps',
  'options',
  'simple',
  'size',
  'value',
  'select',
  'placeholder'
];

/**
 * Dropdown component for displaying a dropdown menu of options
 * @param props DropdownProps
 */
export function Dropdown(props: DropdownProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [popoverRef, isOpen, setIsOpen] = usePopover(false, null);
  const [selectedOption, setSelectedOption] = useState<IDropdownOption | null>(getInitialOption());
  const [options, setOptions] = useState<IDropdownOption[]>(props.options);
  const [currentOption, setCurrentOption] = useState<IDropdownOption | null>(getInitialOption());

  useEffect(() => {
    if (props.value !== undefined && props.value !== selectedOption?.value) {
      const valueOption = props.options?.find((option) => option.value === props.value)
      setSelectedOption(valueOption);
    }
  }, [props.value]);

  useEffect(() => {
    if (!isEqual(props.options, options)) {
      setOptions(props.options);
      setSelectedOption(getInitialOption());
    }
  }, [props.options]);

  // Emit change event when option is selected (for Form)
  useEffect(() => {
    if (!props.disabled) {
      dispatchChangeValue(selectedOption?.value, props.name, props.id);
    }
  }, [selectedOption]);

  function getInitialOption() {
    let initOption = props.options?.find((option) => option.value === props.initialValue);

    if (!initOption) {
      initOption = props.options?.find((option) => option.value === props.value);
    }

    return initOption;
  }

  function onChange(e: any, option) {
    if (!props.disabled) {
      const newEvent = {
        ...e,
        target: {
          ...e.target,
          value: option.value
        }
      };

      if (option?.onChange) {
        option.onChange(newEvent);
      } else {
        props.onChange?.(newEvent);
      }

      setSelectedOption(option);
      setCurrentOption(option);
      setIsOpen(false);
    }
  }

  function onSearch(e) {
    if (props.disabled) {
      return;
    }

    const value = e?.target.value;

    if (!isOpen) {
      setIsOpen(true);
    }

    if (props.onSearch) {
      props.onSearch(value);
    }

    if (props.autoFilterOnSearch) {
      // filter options based on search value
      const filteredOptions = props.options?.filter((option) =>
        option.label.toLowerCase().trim().includes(value.toLowerCase().trim())
      );

      setOptions([...filteredOptions]);
      setCurrentOption(filteredOptions[0]);
    }
  }

  function onkeydown(e) {
    if (!props.disabled) {
      const key = e?.key;

      if (key === 'ArrowDown') {
        e?.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          const index = options?.findIndex((o) => o.value === currentOption?.value);
          const nextIndex = index + 1;
          const nextOption = options[nextIndex];

          setCurrentOption(nextOption || options[0]);
          scrollToOption(nextOption || options[0]);
        }
      } else if (key === 'ArrowUp') {
        e?.preventDefault();

        if (!isOpen) {
          setIsOpen(true);
        } else {
          const index = options?.findIndex((o) => o.value === currentOption?.value);
          const nextIndex = index - 1;
          const nextOption = options[nextIndex];

          setCurrentOption(nextOption || options[options.length - 1]);
          scrollToOption(nextOption || options[options.length - 1]);
        }
      } else if (key === 'Enter') {
        e?.preventDefault();

        if (isOpen) {
          onChange(e, currentOption);
        } else {
          setIsOpen(true);
        }
      } else if (key === 'Tab') {
        setIsOpen(false);
      }
    }
  }

  function scrollToOption(option) {
    const optionEl = document.getElementById(`${props.id || props.name}-dropdown-option-${option?.value}`);
    const optionContainer = document.getElementById(`${props.id || props.name}-dropdown-options-container`);
    if (optionEl && optionContainer) {
      optionContainer.scrollTop = optionEl.offsetTop;
    }
  }

  return (
    <div
      {...omit(props, omitValues)}
      className={getClassName({
        name: 'finallyreact-dropdown',
        props,
        simple,
        disabled: props.disabled,
        custom: props.className
      })}
      onKeyDown={onkeydown}
      ref={popoverRef}
      role={props.role ?? 'combobox'}
      aria-label={props['aria-label'] ?? props.textInputProps?.placeholder ?? 'Dropdown'}
      aria-expanded={isOpen}
      aria-disabled={props.disabled}
      aria-haspopup="listbox"
      tabIndex={props.tabIndex ?? props.select ? 0 : -1}
    >
      <TextInput
        {...props.textInputProps}
        placeholder={props.placeholder ?? props.textInputProps?.placeholder}
        value={selectedOption?.label?.toString()}
        outline={props.textInputProps?.outline == null ? true : false}
        onChange={onSearch}
        inputProps={{
          ...props.textInputProps?.inputProps,
          onClick: (e) => {
            if (!props.disabled) {
              if (!props.select) {
                setIsOpen(true);
              } else {
                if (isOpen) {
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }
            }

            props.textInputProps?.onClick?.(e);
          },
          onFocus: (e) => {
            if (!props.disabled) {
              if (!props.select) {
                setIsOpen(true);
              } else {
                if (isOpen) {
                  setIsOpen(false);
                } else {
                  setIsOpen(true);
                }
              }
            }

            props.textInputProps?.onFocus?.(e);
          }
        }}
        disabled={props.disabled ?? props.textInputProps?.disabled}
        simple={props.simple ?? props.textInputProps?.simple}
        color={props.color ?? props.textInputProps?.color}
        onClear={() => {
          setSelectedOption(null);
          props.textInputProps?.onClear?.();
          props.onChange?.({ target: { value: null } } as any);
          setIsOpen(false);
        }}
        className={getClassName({
          name: 'finallyreact-dropdown__input',
          props,
          simple,
          custom: props.textInputProps?.className
        })}
        readOnly={props.select}
        showDropdown={true}
        size={props.size || props.textInputProps?.size || undefined}
      />

      {isOpen && !props.children && (
        <div
          {...props.optionContainerProps}
          id={`${props.id || props.name}-dropdown-options-container`}
          className={getClassName({
            name: 'finallyreact-dropdown__options-container',
            props,
            simple,
            custom: props.optionContainerProps?.className
          })}
          role="listbox"
          aria-hidden={!isOpen}
        >
          {props.children ? (
            props.children
          ) : options?.length ? (
            options?.map((option) => (
              <div
                {...option}
                id={`${props.id || props.name}-dropdown-option-${option.value}`}
                key={`${props.id || props.name}-dropdown-option-${option.value}`}
                className={getClassName({
                  name: 'finallyreact-dropdown__option',
                  props,
                  simple,
                  disabled: option.disabled,
                  active: currentOption?.value === option.value,
                  custom: option.className
                })}
                onClick={(e) => {
                  if (!option.disabled) {
                    e?.preventDefault?.();
                    onChange(e, option);
                    e?.stopPropagation?.();
                  }
                }}
                aria-selected={currentOption?.value === option.value}
                role="option"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div
              className={getClassName({
                name: 'finallyreact-dropdown__option',
                props,
                simple
              })}
            >
              No options
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
