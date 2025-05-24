import { filterClassName } from '@util/helpers/classFilter';
import { TextInputProps } from './TextInput';
import { NumberInputProps } from './NumberInput';

export function getClassName({
  name,
  props,
  simple,
  custom,
  focused,
  active,
  showToggle,
  formattedValue
}: {
  name: string;
  props: NumberInputProps | TextInputProps;
  simple: boolean;
  custom?: string;
  focused?: boolean;
  active?: boolean;
  showToggle?: boolean;
  formattedValue?: any;
}) {
  let value = name;
  const floatingPlaceholder = props.floatingPlaceholder == null ? true : props.floatingPlaceholder;
  const size = props.size || 'md';

  if (name === 'finallyreact-input') {
    value += ' relative flex';

    if (!simple && (props.disabled || props.readOnly)) {
      value += ' cursor-default';
    }
  }

  if (!simple) {
    if (name === 'finallyreact-input__label') {
      value += ' text left-0 ml-1/5 pointer-events-none absolute transition-2-ease-all';
    }

    if (name === 'finallyreact-input__box') {
      value += ' border-solid text outline-none';

      if (props.disabled || props.readOnly) {
        value += ' pt-2/5';
      }

      if (props.outline) {
        value += ' border-1';
      } else {
        value += ' border-t-0 border-r-0 border-b-1 border-l-0';
      }

      if (props.rounded) {
        value += ' rounded-1';
      }

      if (props.disabled || props.readOnly) {
        value += ' cursor-default';
      }

      if (!simple) {
        value += ` border-${props.color || 'black'}`;
      }
    }

    if (name === 'finallyreact-input__dropdown') {
      if (props.disabled || props.readOnly) {
        value += ' cursor-default';
      } else {
        value += ' cursor-pointer';
      }
      value += ' border-l-0 border-solid';

      if (props.outline) {
        value += ' border-r-1 border-t-1';
      } else {
        value += ' border-r-0 border-t-0';
      }

      if (props.rounded) {
        value += ' border-b-0';
      } else {
        value += ' border-b-2';
      }
    }

    if (name === 'finallyreact-input__down-arrow') {
      value +=
        ' mx-1/10 border-solid border-black border-t-0 border-r-2 border-b-2 border-l-0 w-1/2 h-1/2 vertical-align-middle transition-transform-2-ease-quick rotate-45';

      if (size === 'lg') {
        value += ' mt-1/2';
      } else {
        value += ' mt-1/5';
      }
    }

    if (name === 'finallyreact-input__clear') {
      if (props.disabled || props.readOnly) {
        value += ' cursor-default';
      } else {
        value += ' cursor-pointer';
      }
      value += ' border-l-0 border-b-1 border-solid after-clear';

      if (props.color) {
        value += ` border-${props.color} ${props.color}`;
      }

      if (props.outline && !props.rounded) {
        value += ' border-r-1 border-t-1';
      } else {
        value += ' border-r-0 border-t-0';
      }

      if (props.rounded) {
        value += ' border-b-0';
      } else {
        value += ' border-b-2';
      }
    }

    if (size === 'sm') {
      if (name === 'finallyreact-input') {
        value += ' h-2';
      }

      if (name === 'finallyreact-input__box') {
        value += ' text-sm pt-2/5 pr-1/5 pb-3/10 pl-1/5 w-3-1/2';

        if (props.rounded) {
          value += ' pl-3/10';
        }
      }

      if (focused || active) {
        if (name === 'finallyreact-input__label') {
          if (floatingPlaceholder) {
            value += ' -top-1/2';
          }
        }
      }

      if (name === 'finallyreact-input__label') {
        value += ' text-sm left-1/5 top-1/2';

        if (props.rounded) {
          value += ' left-1/5';
        }

        if (formattedValue && props.color) {
          value += ` ${props.color}`;
        }
      }

      if (name === 'finallyreact-input__clear') {
        value += ' text-sm pt-2/5 pr-3/10 pb-0 pl-3/10';
      }

      if (name === 'finallyreact-input__dropdown') {
        if (props.disabled || props.readOnly) {
          value += ' text-sm pt-1/5 pr-3/10 pb-0 pl-3/10';
        } else {
          value += ' text-sm pt-2/5 pr-3/10 pb-0 pl-3/10';
        }
      }
    }

    if (size === 'md') {
      if (name === 'finallyreact-input') {
        value += ' h-2-1/5';
      }

      if (name === 'finallyreact-input__box') {
        value += ' text pt-1/2 pr-3/10 pl-3/10 w-7';

        if (!props.disabled || props.readOnly) {
          value += ' pb-2/5';
        }

        if (props.rounded) {
          value += ' pl-2/5';
        }
      }

      if (focused || active) {
        if (name === 'finallyreact-input__label') {
          if (floatingPlaceholder) {
            value += ' -top-4/5';
          }
        }
      }

      if (name === 'finallyreact-input__label') {
        value += ' text left-1/5 top-1/2';

        if (props.rounded) {
          value += ' left-1/5';
        }
      }

      if (name === 'finallyreact-input__clear' || name === 'finallyreact-input__dropdown') {
        value += ' text pt-2/5 pr-3/10 pb-0 pl-3/10';
      }
    }

    if (size === 'lg') {
      if (name === 'finallyreact-input') {
        value += ' h-2-1/5';
      }

      if (name === 'finallyreact-input__box') {
        value += ' text-lg pt-3/5 pr-3/10 pb-1/2 pl-3/10 w-10';

        if (props.rounded) {
          value += ' pl-1/2';
        }
      }

      if (focused || active) {
        if (name === 'finallyreact-input__label') {
          if (floatingPlaceholder) {
            value += ' -top-4/5';
          }
        }
      }

      if (name === 'finallyreact-input__label') {
        value += ' text left-1/5 top-1/2';

        if (props.rounded) {
          value += ' left-1/5';
        }
      }

      if (name === 'finallyreact-input__clear') {
        value += ' text-lg pr-2/5 pb-1 pl-2/5';
      }

      if (name === 'finallyreact-input__dropdown') {
        value += ' text-lg pr-2/5 pb-1 pl-2/5';

        if (props.disabled || props.readOnly) {
          value += ' pt-1/10';
        }
      }
    }

    if (focused || active) {
      if (name === 'finallyreact-input__label') {
        if (floatingPlaceholder) {
          value += ' white-bg opacity-100';
        } else {
          value += ' opacity-0';
        }
      }

      if (name === 'finallyreact-input__box') {
        value += ' -top-1';
      }
    } else {
      if (name === 'finallyreact-input__label') {
        value += ' opacity-75';
      }
    }
  }

  if (name === 'finallyreact-input__password-toggle') {
    if (props.disabled || props.readOnly) {
      value += ' cursor-default';
    } else {
      value += ' cursor-pointer';
    }
    value += ' align-center flex mr-1/5';

    if (showToggle) {
      value += ' password-toggle-show';
    } else {
      value += ' password-toggle-hide';
    }
  }

  return filterClassName(value, custom);
}
