/**
 * Check whether the input is a number
 * @param n
 * @returns boolean
 */
export function isNumber(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default isNumber;
