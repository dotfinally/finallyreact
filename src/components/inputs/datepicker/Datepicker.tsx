import React, { HTMLAttributes, useEffect, useMemo } from 'react';
import { dispatchChangeValue, getFinallyConfig, omit, usePopover } from '@util/index';
import { TextInput, TextInputProps } from '../input/TextInput';
import { getClassName } from './DatepickerStyles';
import { Dropdown, DropdownProps, NumberInput, NumberInputProps } from '@components/index';

export interface DatepickerProps extends HTMLAttributes<any> {
  color?: string;
  dayProps?: HTMLAttributes<any>;
  disabled?: boolean;
  displayProps?: HTMLAttributes<any>;
  inputProps?: TextInputProps;
  name?: string;
  selectedProps?: HTMLAttributes<any>;
  showTodayLink?: boolean;
  simple?: boolean;
  todayLinkProps?: HTMLAttributes<any>;
  todayProps?: HTMLAttributes<any>;
  value?: string;
  initialValue?: string;
  monthLabelProps?: HTMLAttributes<any>;
  monthPickerProps?: DropdownProps;
  customMonthPicker?: any;
  yearLabelProps?: HTMLAttributes<any>;
  yearPickerProps?: NumberInputProps;
  customYearPicker?: any;
  placeholder?: string;
}

const omitValues = [
  'color',
  'dayProps',
  'disabled',
  'displayProps',
  'inputProps',
  'name',
  'selectedProps',
  'showTodayLink',
  'simple',
  'todayLinkProps',
  'todayProps',
  'value',
  'initialValue',
  'monthLabelProps',
  'monthPickerProps',
  'customMonthPicker',
  'yearLabelProps',
  'yearPickerProps',
  'customYearPicker',
  'placeholder'
];

const DEFAULT_DATE_MASK = 'yyyy-mm-dd';

/**
 * Datepicker component for selecting a date
 * @param props DatepickerProps
 */
export function Datepicker(props: DatepickerProps) {
  const finallySimple = useMemo(() => {
    return getFinallyConfig().simple;
  }, []);
  const simple = finallySimple || props.simple;

  const [popoverRef, isOpen, setIsOpen] = usePopover(false, null);

  const [selectedYear, setSelectedYear] = React.useState<number>();
  const [selectedMonth, setSelectedMonth] = React.useState<number>();
  const [selectedDay, setSelectedDay] = React.useState<number>();

  const [displayMonth, setDisplayMonth] = React.useState<number>();
  const [displayYear, setDisplayYear] = React.useState<number>();

  const [editMonth, setEditMonth] = React.useState<boolean>(false);
  const [editYear, setEditYear] = React.useState<boolean>(false);

  // mask must use yyyy, mm, and dd in order to work
  const dateMask = props.inputProps?.mask?.toLowerCase()?.trim() || DEFAULT_DATE_MASK;
  // convert date to mask with 1s instead of characters
  const dateMaskWith1s = dateMask.replace(/y/g, '1').replace(/m/g, '1').replace(/d/g, '1');

  useEffect(() => {
    if (props.value == null && props.initialValue != null) {
      const date = new Date(props.initialValue);
      setSelectedYear(date.getFullYear());
      setSelectedMonth(date.getMonth());
      setSelectedDay(date.getDate());
      setDisplayYear(date.getFullYear());
      setDisplayMonth(date.getMonth());
    }
  }, []);

  useEffect(() => {
    if (!(props.initialValue != null && props.value == null)) {
      if (props.value && props.value?.length === dateMask.length) {
        const date = new Date(props.value);
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth());
        setSelectedDay(date.getDate());
        setDisplayYear(date.getFullYear());
        setDisplayMonth(date.getMonth());
      } else {
        setSelectedYear(undefined);
        setSelectedMonth(undefined);
        setSelectedDay(undefined);

        const now = new Date();
        setDisplayMonth(now.getMonth() + 1);
        setDisplayYear(now.getFullYear());
      }
    }
  }, [props.value]);

  // Emit change event when date is selected (for Form)
  useEffect(() => {
    if (!props.disabled && !props.inputProps?.disabled && (props.name || props.id)) {
      if (selectedYear && selectedMonth && selectedDay) {
        const value = convertDateWithMask(selectedYear, selectedMonth, selectedDay);

        dispatchChangeValue(value, props.name, props.id);
      } else {
        dispatchChangeValue(undefined, props.name, props.id);
      }
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  const details = useMemo(() => {
    return getDetails();
  }, [displayMonth, displayYear]);

  function convertDateWithMask(inputYear, inputMonth, inputDay) {
    if (inputYear != null && inputMonth != null && inputDay != null) {
      const year = inputYear.toString();
      const month = inputMonth.toString().padStart(2, '0');
      const day = inputDay.toString().padStart(2, '0');

      return dateMask.replace('yyyy', year).replace('mm', month).replace('dd', day);
    }

    return '';
  }

  function getDetails() {
    const now = new Date();
    const day = now.getDate();
    const month = displayMonth != null ? displayMonth : now.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = displayYear != null ? displayYear : now.getFullYear();

    const displayNow = new Date(year, month - 1, day);

    const dayOfWeek = displayNow.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayOfFirstDate = new Date(year, month - 1, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.

    const daysInThisMonth = daysInMonth(month, year);
    const daysInLastMonth = daysInMonth(month - 1, year);
    const daysInNextMonth = daysInMonth(month + 1, year);

    return {
      now,
      day,
      month,
      year,
      dayOfWeek,
      daysInThisMonth,
      daysInLastMonth,
      daysInNextMonth,
      dayOfFirstDate
    };
  }

  // month is 1 indexed
  function daysInMonth(month, year) {
    const d = new Date(year, month, 0);
    return d.getDate();
  }

  const months = [
    {
      label: 'January',
      value: 1
    },
    {
      label: 'February',
      value: 2
    },
    {
      label: 'March',
      value: 3
    },
    {
      label: 'April',
      value: 4
    },
    {
      label: 'May',
      value: 5
    },
    {
      label: 'June',
      value: 6
    },
    {
      label: 'July',
      value: 7
    },
    {
      label: 'August',
      value: 8
    },
    {
      label: 'September',
      value: 9
    },
    {
      label: 'October',
      value: 10
    },
    {
      label: 'November',
      value: 11
    },
    {
      label: 'December',
      value: 12
    }
  ];

  function getMonthName(month) {
    return months[month - 1].label;
  }

  function getDays() {
    const days = [];

    // first row of dates - last few days of previous month
    // and first few days of this month
    for (let i = 0; i < details.dayOfFirstDate; i++) {
      days.push({
        day: details.daysInLastMonth - details.dayOfFirstDate + i + 1,
        month: details.month - 1,
        year: details.month === 1 ? details.year - 1 : details.year,
        currentMonth: false
      });
    }

    // all dates in this month
    for (let i = 0; i < details.daysInThisMonth; i++) {
      days.push({
        day: i + 1,
        month: details.month,
        year: details.year,
        currentMonth: true
      });
    }

    // dates for next month
    const currentDatesLength = days.length;

    const maxDays = days?.[34]?.day < details.daysInThisMonth ? 42 : 35;
    const numberOfWeeks = maxDays / 7;

    for (let i = 0; i < maxDays - currentDatesLength; i++) {
      days.push({
        day: i + 1,
        month: details.month + 1,
        year: details.month === 12 ? details.year + 1 : details.year,
        currentMonth: false
      });
    }

    const dateBoxes = [];

    for (let i = 0; i < numberOfWeeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        const date = days[i * 7 + j];
        const { day, month, year, currentMonth } = date;

        const hasSelectedDate = selectedYear && selectedMonth && selectedDay;
        const isSelected = selectedYear === year && selectedMonth === month && selectedDay === day;
        const isToday =
          details.now.getFullYear() === year && details.now.getMonth() + 1 === month && details.now.getDate() === day;

        week.push(
          <div
            {...(props.dayProps || {})}
            {...(isToday && !hasSelectedDate && (props.todayProps || {}))}
            {...(isSelected && (props.selectedProps || {}))}
            className={getClassName({
              name: 'finallyreact-datepicker__day',
              props,
              simple,
              dayHover: props.dayProps?.className ? false : true,
              currentMonth,
              firstRow: i === 0,
              lastRow: i === numberOfWeeks,
              firstCol: j === 0,
              lastCol: j === 6,
              selected: isSelected,
              today: isToday,
              custom: isSelected
                ? props.selectedProps?.className
                : isToday && props.todayProps?.className
                ? props.todayProps?.className
                : props.dayProps?.className
            })}
            key={`finallyreact-${day}-${month}-${year}`}
            onClick={() => {
              setSelectedDay(day);
              setSelectedMonth(month);
              setSelectedYear(year);
              setIsOpen(false);
            }}
            aria-selected={isSelected}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSelectedDay(day);
                setSelectedMonth(month);
                setSelectedYear(year);
                setIsOpen(false);
              }
            }}
          >
            {day}
          </div>
        );
      }

      dateBoxes.push(
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__week',
            props,
            simple
          })}
          key={`finallyreact-datepicker__week-${i}`}
        >
          {week}
        </div>
      );
    }

    return (
      <div
        className={getClassName({
          name: 'finallyreact-datepicker__days-container',
          props,
          simple
        })}
      >
        {dateBoxes}
      </div>
    );
  }

  function onTodayClick(e) {
    const now = new Date();
    setSelectedDay(now.getDate());
    setSelectedMonth(now.getMonth() + 1);
    setSelectedYear(now.getFullYear());
    setDisplayMonth(now.getMonth() + 1);
    setDisplayYear(now.getFullYear());

    setIsOpen(false);

    props.onChange?.({
      ...e,
      target: {
        ...e.target,
        value: convertDateWithMask(now.getFullYear(), now.getMonth() + 1, now.getDate())
      }
    });
  }

  function onChangeDate(e) {
    const value = e?.target?.value;
    const event = e
      ? {
          ...e,
          target: {
            ...e.target,
            value
          }
        }
      : {
          target: {
            value
          }
        };

    // if value is a valid date in dateMask
    if (value?.length === dateMask.length) {
      // get year, month, day from value based on dateMask (yyyy-mm-dd)
      const year = parseInt(value.substring(dateMask.indexOf('yyyy'), dateMask.indexOf('yyyy') + 4));
      const month = parseInt(value.substring(dateMask.indexOf('mm'), dateMask.indexOf('mm') + 2));
      const day = parseInt(value.substring(dateMask.indexOf('dd'), dateMask.indexOf('dd') + 2));

      setSelectedDay(day);
      setSelectedMonth(month);
      setSelectedYear(year);
      setDisplayMonth(month);
      setDisplayYear(year);

      event.target.value = convertDateWithMask(year, month, day);
    } else if (!value) {
      setSelectedYear(undefined);
      setSelectedMonth(undefined);
      setSelectedDay(undefined);

      const now = new Date();
      setDisplayMonth(now.getMonth() + 1);
      setDisplayYear(now.getFullYear());

      event.target.value = '';
    }

    props.onChange?.(event);
    props.inputProps?.onChange?.(event);
  }

  function onDateKeyDown(e) {
    // If Enter, Tab, or Escape key is pressed, close datepicker
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    } else if (!isOpen && e?.key !== 'Tab') {
      setIsOpen(true);
    }
  }

  function onLeftClick() {
    const viewMonth = displayMonth == null ? details.month : displayMonth;
    const viewYear = displayYear == null ? details.year : displayYear;

    if (viewMonth === 1) {
      setDisplayMonth(12);
      setDisplayYear(viewYear - 1);
    } else {
      setDisplayMonth(viewMonth - 1);
    }
  }

  function onRightClick() {
    const viewMonth = displayMonth == null ? details.month : displayMonth;
    const viewYear = displayYear == null ? details.year : displayYear;

    if (viewMonth === 12) {
      setDisplayMonth(1);
      setDisplayYear(viewYear + 1);
    } else {
      setDisplayMonth(viewMonth + 1);
    }
  }

  const datepickerDisplay = (
    <div
      {...(props.displayProps || {})}
      className={getClassName({
        name: 'finallyreact-datepicker__display',
        props,
        simple,
        custom: props.displayProps?.className
      })}
      onBlur={(e) => {
        props.displayProps?.onBlur?.(e);
      }}
    >
      <div
        className={getClassName({
          name: 'finallyreact-datepicker__header',
          props,
          simple
        })}
      >
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__header-left',
            props,
            simple
          })}
          onClick={onLeftClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onLeftClick();
            }
          }}
          tabIndex={0}
        />

        {editMonth ? (
          props.customMonthPicker ? (
            props.customMonthPicker
          ) : (
            <Dropdown
              {...(props.monthPickerProps || {})}
              options={props.monthPickerProps?.options ?? months}
              autoFilterOnSearch={props.monthPickerProps?.autoFilterOnSearch ?? true}
              initialValue={props.monthPickerProps?.initialValue ?? displayMonth != null ? displayMonth : details.month}
              onChange={(e: any) => {
                console.log('month on change', e?.target.value);
                setDisplayMonth(e.target.value);
                setEditMonth(false);
                props.monthPickerProps?.onChange?.(e);
              }}
              className={getClassName({
                name: 'finallyreact-datepicker__month-picker',
                props,
                simple,
                custom: props.monthPickerProps?.className
              })}
              simple={simple}
            />
          )
        ) : (
          <div
            {...(props.monthLabelProps || {})}
            className={getClassName({
              name: 'finallyreact-datepicker__header-month',
              props,
              simple,
              custom: props.monthLabelProps?.className
            })}
            tabIndex={props.monthLabelProps?.tabIndex ?? 0}
            onClick={(e: any) => {
              setEditMonth(true);
              props.monthLabelProps?.onClick?.(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEditMonth(true);
              }
              props.monthLabelProps?.onKeyDown?.(e);
            }}
          >
            {getMonthName(displayMonth != null ? displayMonth : details.month)}
          </div>
        )}

        {editYear ? (
          props.customYearPicker ? (
            props.customYearPicker
          ) : (
            <NumberInput
              {...(props.yearPickerProps || {})}
              simple={simple}
              initialValue={props.yearPickerProps?.initialValue ?? displayYear != null ? displayYear : details.year}
              onBlur={(e: any) => {
                setDisplayYear(e.target.value);
                setEditYear(false);
                props.yearPickerProps?.onChange?.(e);
              }}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  setDisplayYear(e.target.value);
                  setEditYear(false);
                }
                props.yearPickerProps?.onKeyDown?.(e);
              }}
              className={getClassName({
                name: 'finallyreact-datepicker__year-picker',
                props,
                simple,
                custom: props.yearPickerProps?.className
              })}
              disableFormat={props.yearPickerProps?.disableFormat ?? true}
            />
          )
        ) : (
          <div
            {...(props.yearLabelProps || {})}
            className={getClassName({
              name: 'finallyreact-datepicker__header-year',
              props,
              simple,
              custom: props.yearLabelProps?.className
            })}
            tabIndex={props.yearLabelProps?.tabIndex ?? 0}
            onClick={(e: any) => {
              setEditYear(true);
              props.yearLabelProps?.onClick?.(e);
            }}
          >
            {displayYear != null ? displayYear : details.year}
          </div>
        )}

        <div
          className={getClassName({
            name: 'finallyreact-datepicker__header-right',
            props,
            simple
          })}
          onClick={onRightClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onRightClick();
            }
          }}
          tabIndex={0}
        />
      </div>

      <div
        className={getClassName({
          name: 'finallyreact-datepicker__day-header',
          props,
          simple
        })}
      >
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple,
            firstDay: true
          })}
          tabIndex={0}
        >
          Sun
        </div>
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple
          })}
          tabIndex={0}
        >
          Mon
        </div>
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple
          })}
          tabIndex={0}
        >
          Tue
        </div>
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple
          })}
          tabIndex={0}
        >
          Wed
        </div>
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple
          })}
          tabIndex={0}
        >
          Thu
        </div>
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple
          })}
          tabIndex={0}
        >
          Fri
        </div>
        <div
          className={getClassName({
            name: 'finallyreact-datepicker__day-name',
            props,
            simple,
            lastDay: true
          })}
          tabIndex={0}
        >
          Sat
        </div>
      </div>

      {getDays()}

      <div
        className={getClassName({
          name: 'finallyreact-datepicker__footer',
          props,
          simple
        })}
      >
        {props.showTodayLink !== false && (
          <div
            className={getClassName({
              name: 'finallyreact-datepicker__today-link',
              props,
              simple,
              custom: props.todayLinkProps?.className
            })}
            onClick={(e) => onTodayClick(e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onTodayClick(e);
              }
            }}
            onBlur={(e) => {
              setIsOpen(false);
            }}
            tabIndex={0}
            aria-label="Click to select today's date"
          >
            Today
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      {...omit(props, omitValues)}
      ref={popoverRef}
      className={getClassName({
        name: 'finallyreact-datepicker',
        props,
        simple,
        custom: props.className
      })}
      style={props.style}
      onKeyDown={(e) => {
        if (!props.disabled) {
          onDateKeyDown(e);
          props.onKeyDown?.(e);
          props.inputProps?.onKeyDown?.(e);
        }
      }}
      role={props.role ?? 'application'}
      aria-expanded={isOpen}
      aria-disabled={props.disabled}
      name={props.name}
    >
      <TextInput
        {...props.inputProps}
        className={getClassName({
          name: 'finallyreact-datepicker__input',
          props,
          simple,
          custom: props.inputProps?.className
        })}
        disabled={props.disabled ?? props.inputProps?.disabled}
        color={props.inputProps?.color || props.color}
        mask={dateMaskWith1s}
        outline={props.inputProps?.outline == null ? true : props.inputProps?.outline}
        simple={props.simple}
        placeholder={props.placeholder ?? props.inputProps?.placeholder}
        onFocus={(e) => {
          if (!props.disabled) {
            setIsOpen(true);
            props.inputProps?.onFocus?.(e);
          }
        }}
        onChange={(e) => {
          if (!props.disabled) {
            onChangeDate(e);
            props.inputProps?.onChange?.(e);
          }
        }}
        onClear={() => {
          if (!props.disabled) {
            onChangeDate(null);
            props.inputProps?.onClear?.();
          }
        }}
        onBlur={(e) => {
          if (!props.disabled) {
            props.inputProps?.onBlur?.(e);
          }
        }}
        onClick={(e) => {
          if (!props.disabled) {
            setIsOpen(true);
            props.inputProps?.onClick?.(e);
          }
        }}
        onKeyDown={(e) => {
          if (!props.disabled) {
            // if shift tab, close the datepicker
            if (e.key === 'Tab' && e?.shiftKey) {
              setIsOpen(false);
            }
            props.inputProps?.onKeyDown?.(e);
          }
        }}
        value={props.value || convertDateWithMask(selectedYear, selectedMonth, selectedDay)}
        aria-label={
          props.inputProps?.['aria-label'] ??
          `Datepicker, year: ${selectedYear}, month: ${selectedMonth}, day: ${selectedDay}, click escape to close or tab to select a different date`
        }
      />

      {isOpen && datepickerDisplay}
    </div>
  );
}

export default Datepicker;
