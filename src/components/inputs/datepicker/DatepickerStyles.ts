import { filterClassName } from '@util/helpers/classFilter';
import { DatepickerProps } from './Datepicker';

export function getClassName({
  name,
  props,
  simple,
  custom,
  firstDay,
  lastDay,
  currentMonth,
  dayHover,
  today,
  selected,
  firstRow,
  lastRow,
  firstCol,
  lastCol
}: {
  name: string;
  props: DatepickerProps;
  simple: boolean;
  custom?: string;
  firstDay?: boolean;
  lastDay?: boolean;
  currentMonth?: boolean;
  dayHover?: boolean;
  today?: boolean;
  selected?: boolean;
  firstRow?: boolean;
  lastRow?: boolean;
  firstCol?: boolean;
  lastCol?: boolean;
}) {
  let value = name;

  if (name === 'finallyreact-datepicker') {
    value += ' w-max-content';
  }

  if (!simple) {
    if (props.disabled || props.readOnly) {
      value += ' cursor-not-allowed';
    }

    if (name === 'finallyreact-datepicker__display') {
      value += ' border-1 pt-1 pr-1 pb-1/2 pl-1';

      value += ` ${props.color || 'black'}`;
      value += ` border-${props.color || 'black'}`;

      if (!custom) {
        value += ' white-bg';
      }
    }

    if (value === 'finallyreact-datepicker__header') {
      value += ' border-b-2 border-b-black pb-1/2';
    }

    if (value === 'finallyreact-datepicker__day-header') {
      value += ' text-center';
    }

    if (value === 'finallyreact-datepicker__day-name') {
      value += ' h-1-1/2 py-1/2 px-3/10';

      if (firstDay || lastDay) {
        value += ' w-2-1/4';
      } else {
        value += ' w-2-1/10';
      }
    }

    if (value === 'finallyreact-datepicker__week') {
      value += ' text-center';
    }

    if (value === 'finallyreact-datepicker__day') {
      value += ' border-1 pointer h-1-1/2 py-1/2 px-3/10 w-2';

      if (!currentMonth) {
        value += ' stone-6';

        if (selected) {
          if (props.color) {
            value += ` border-${props.color}`;
          } else {
            value += ' border-ocean-6';
          }
        }
      }

      if (currentMonth) {
        if (props.color) {
          value += ` ${props.color}`;
        }
        value += ` border-${props.color || 'black'}`;
      }

      if (dayHover) {
        value += ' hover:stone-8-bg border-1 hover:border-stone-8 hover:white';
      }

      if (today) {
        if (props.color) {
          value += ` ${props.color} bold`;
        } else {
          value += ' ocean-6 bold';
        }
      }

      if (selected) {
        if (props.color) {
          value += ` ${props.color}-bg white`;
        } else {
          value += ' ocean-6-bg white';
        }
      }

      if (firstRow) {
        value += ' border-t-1/5';
      }

      if (lastRow) {
        value += ' border-b-1/5';
      }

      if (firstCol) {
        value += ' border-l-1/5';
      }

      if (lastCol) {
        value += ' border-r-1/5';
      }
    }

    if (value === 'finallyreact-datepicker__today-link') {
      value += ' ocean-8 hover:ocean-6';
    }
  }

  if (name === 'finallyreact-datepicker__input') {
    value += ' w-fit-content';
  }

  if (name === 'finallyreact-datepicker__display') {
    value += ' absolute w-max-content z-130';
  }

  if (name === 'finallyreact-datepicker__header') {
    value += ' flex justify-content-between align-center';
  }

  const arrowValue =
    ' border-t-0 border-r-2 border-b-2 border-l-0 pointer h-3/5 m-3/10 transition-transform-2-ease-quick vertical-align-middle w-3/5';

  if (name === 'finallyreact-datepicker-arrow') {
    value += arrowValue;
  }

  if (name === 'finallyreact-datepicker__header-left') {
    value += ` ${arrowValue} rotate-135`;
  }

  if (name === 'finallyreact-datepicker__header-right') {
    value += ` ${arrowValue} -rotate-45`;
  }

  if (name === 'finallyreact-datepicker__header-month') {
    value += ' my-0 mx-3/10 pointer';
  }

  if (name === 'finallyreact-datepicker__header-year') {
    value += ' my-0 mx-3/10 pointer';
  }

  if (name === 'finallyreact-datepicker__day-header') {
    value += ' flex';
  }

  if (name === 'finallyreact-datepicker__week') {
    value += ' flex';
  }

  if (name === 'finallyreact-datepicker__footer') {
    value += ' flex justify-content-end mt-2/5';
  }

  if (name === 'finallyreact-datepicker__today-link') {
    value += ' pointer';
  }

  return filterClassName(value, custom);
}
