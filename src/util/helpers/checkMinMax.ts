/*
  Check whether a given number is between the min and max defined

  @param value: number
  @param min: number
  @param max: number

  @return: number
*/
export function checkMinMax(value: number, min: number, max: number): number {
  let newValue = value;

  if (value || value === 0) {
    if (min) {
      if (value < min) {
        newValue = min;
      }
    }
    if (max) {
      if (value > max) {
        newValue = max;
      }
    }
  }

  return newValue;
}

export default checkMinMax;
