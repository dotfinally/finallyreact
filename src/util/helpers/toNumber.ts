/**
 * convert given value to number
 * @param value
 * @returns number
 */
export function toNumber(value: string | number): number {
  if (value == null || value === '') {
    return undefined;
  }

  const number = Number(value);
  const returnValue = isNaN(number) || number == null ? undefined : number;

  return returnValue;
}

export default toNumber;
