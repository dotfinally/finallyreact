import checkMinMax from '../helpers/checkMinMax';
import getCurrency from '../helpers/getCurrency';
import getLocale from '../helpers/getBrowserLocale';
import isNumber from '../helpers/isNumber';
import toNumber from '../helpers/toNumber';

export interface IFormatNumber {
  value: number;
  type?: 'number' | 'percent' | 'currency';
  locale?: string;
  currency?: string;
  min?: number;
  max?: number;
  decimals?: number;
  minDecimals?: number;
  maxDecimals?: number;
  round?: 'round' | 'ceil' | 'floor' | 'truncate';
}

/*
  Format a given number value by locale, to either a number, percent, or currency.

  Number example: 123456 -> 123,456
  Percent example: 123456 -> 123,456%
  Currency example: 123456 -> $123,456.00

  Note: default decimals will vary based on type and currency.

  @param value: number
  @param type: string, either 'number', 'percent', or 'currency'
  @param locale: string
  @param currency: string
  @param min: number
  @param max: number
  @param decimals: number
  @param minDecimals: number (0 floor)
  @param maxDecimals: number (20 ceiling)

  @return string, formatted string of given value, based on type
*/
export function formatNumber(props: IFormatNumber): string {
  const params = cleanParams(props);

  let value = params.value;
  const type = params.type || 'number';
  let locale = params.locale || getLocale();
  let currency = params.currency || getCurrency(locale);
  let min = params.min;
  let max = params.max;
  let minDecimals = params.minDecimals;
  let maxDecimals = params.maxDecimals;

  if (params.minDecimals > params.maxDecimals) {
    console.warn('Invalid NumberInput params: minDecimals > maxDecimals');
    minDecimals = undefined;
    maxDecimals = undefined;
  }

  if (params.minDecimals < 0) {
    console.warn('Invalid NumberInput params: minDecimals < 0. Setting to 0');
    minDecimals = 0;
  }

  if (params.maxDecimals > 20) {
    console.warn('Invalid NumberInput params: maxDecimals > 20. Setting to 20');
    maxDecimals = 20;
  }

  if (params.min > params.max) {
    console.warn('Invalid NumberInput params: min > max');
    min = undefined;
    max = undefined;
  }

  // if decimals is set and both minDecimals and maxDecimals are undefined,
  // set minDecimals and maxDecimals to decimals
  if (params.decimals != null && params.minDecimals == null && params.maxDecimals == null) {
    if (params.decimals < 0) {
      console.warn('Invalid NumberInput params: decimals < 0. Not going to use');
    } else {
      minDecimals = params.decimals;
      maxDecimals = params.decimals;
    }
  }

  if (!isNumber(value)) {
    value = toNumber(value);

    if (!isNumber(value)) {
      if (value != null) {
        console.warn('Invalid formatNumber value: ', value);
      }

      return '';
    }
  } else {
    let newMinDecimals = minDecimals < 0 ? 0 : minDecimals;
    let newMaxDecimals = maxDecimals > 20 ? 20 : maxDecimals;
    const newValue = checkMinMax(value, min, max);

    locale = locale.replace('_', '-'); // just in case

    try {
      const roundedValue = roundNumber(newValue, params.round);

      if (type === 'percent') {
        return new Intl.NumberFormat(locale, {
          style: 'percent',
          minimumFractionDigits: newMinDecimals,
          maximumFractionDigits: newMaxDecimals
        }).format(newValue / 100);
      }

      if (type === 'currency') {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: newMinDecimals,
          maximumFractionDigits: newMaxDecimals
        }).format(newValue);
      }

      return new Intl.NumberFormat(locale, {
        minimumFractionDigits: newMinDecimals,
        maximumFractionDigits: newMaxDecimals
      }).format(roundedValue);
    } catch (e) {
      console.error('Error formatting value: ', e);
      return '';
    }
  }

  return '';
}

// if any params field is an empty string, set to undefined
function cleanParams(params: IFormatNumber) {
  for (let key in params) {
    if (params[key] === '' && key !== 'value') {
      params[key] = undefined;
    }
  }

  return params;
}

export default formatNumber;

function roundNumber(value: number, round?: 'round' | 'ceil' | 'floor' | 'truncate'): number {
  if (!round) {
    return value;
  }

  if (round === 'round') {
    return Math.round(value);
  }

  if (round === 'ceil') {
    return Math.ceil(value);
  }

  if (round === 'floor') {
    return Math.floor(value);
  }

  if (round === 'truncate') {
    return Math.trunc(value);
  }

  return value;
}
