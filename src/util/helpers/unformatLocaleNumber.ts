import getLocale from './getBrowserLocale';

/*
  Function to unformat a number based on locale

  @param stringNumber: string
  @param locale: string,

  @return number, unformatted number of input string
*/
export function unformatLocaleNumber(stringNumber: string, locale: string): number {
  if (!stringNumber) {
    return undefined;
  }

  let newLocale = locale;
  if (!locale || locale == null) {
    newLocale = getLocale();
  }
  newLocale = newLocale.replace('_', '-'); // just in case

  try {
    const thousandSeparator = (1111).toLocaleString(newLocale).replace(/1/g, '').replace(/١/g, '');

    const decimalSeparator = (1.1).toLocaleString(newLocale).replace(/1/g, '').replace(/١/g, '');

    const parsed = parseFloat(
      stringNumber
        .replace(new RegExp('[^0-9., -]', 'g'), '')
        .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
    );

    if (isNaN(parsed)) {
      return undefined;
    }

    return parsed;
  } catch (e) {
    if (e.message !== `\\ at end of pattern`) {
      console.warn(e);
    }

    return undefined;
  }
}

export default unformatLocaleNumber;
