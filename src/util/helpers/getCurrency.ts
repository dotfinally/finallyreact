import getLocale from './getBrowserLocale';
import currencyMap from './currencyMap';

/*
  Return a currency based on a given locale (or user's browser's locale)
  (i.e. 'en-US' -> 'USD')

  @param locale: string
  
  @return string
*/
export function getCountryCode(localeString: string): string {
  let components = localeString.split('_');
  if (components.length === 2) {
    return components.pop();
  }

  components = localeString.split('-');
  if (components.length === 2) {
    return components.pop();
  }

  return localeString;
}

export function getCurrency(locale) {
  let userLocale = locale;
  if (!userLocale) {
    userLocale = getLocale();
  }

  const countryCode = getCountryCode(userLocale).toUpperCase();

  if (countryCode in currencyMap) {
    return currencyMap[countryCode];
  }

  return 'USD';
}

export default getCurrency;
