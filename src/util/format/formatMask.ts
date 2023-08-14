/**
 * Uses a given mask to format a value.
 * The mask should have 1s to represent characters in the formatted string and
 * special characters to represent separators between characters.
 * For example: 111-111-1111 would format a phone number, from 1234567890 to 123-456-7890.
 *
 * Logic:
 * 1. Split the value and mask into arrays of characters
 * 2. Loop through the value array
 * 3. If the mask character is a 1, add the value character to the formatted string and remove it from the value array
 * 4. If the mask character is not a 1, add the mask character to the formatted string and remove it from the mask array
 * 5. If the mask has any special characters left until the next 1, add them to the formatted string
 *
 * @param value string
 * @param mask string with 1s and special characters
 * @returns formatted string
 */
export function formatMask(value: string, mask: string): string {
  let formattedValue = '';

  if (!value || !mask) {
    return formattedValue;
  }

  const valueTrack = value.split('');
  const maskTrack = mask.split('');

  while (valueTrack.length > 0 && maskTrack.length > 0) {
    const valueChar = valueTrack[0];
    const maskChar = maskTrack[0];

    if (valueChar === maskChar) {
      formattedValue += valueChar;
      valueTrack.shift();
      maskTrack.shift();
      continue;
    }

    if (maskChar === '1') {
      formattedValue += valueChar;
      valueTrack.shift();
      maskTrack.shift();
      continue;
    }

    if (maskChar !== '1') {
      formattedValue += maskChar;
      maskTrack.shift();
      continue;
    }
  }

  // if maskTrack has any special characters left until the next 1,
  // or until the end of the mask, add them to the formattedValue
  while (maskTrack.length > 0 && maskTrack[0] !== '1') {
    formattedValue += maskTrack[0];
    maskTrack.shift();
  }

  return formattedValue;
}

/**
 * Uses a given mask to unformat a value.
 * The mask should have 1s to represent characters in the formatted string and
 * special characters to represent separators between characters.
 * For example: 111-111-1111 would format a phone number, from 1234567890 to 123-456-7890.
 * 
 * Logic:
 * 1. Split the value and mask into arrays of characters
 * 2. Loop through the value array
 * 3. If the mask character is a 1, add the value character to the unformatted string and shift both track arrays
 * 4. If the mask character is not a 1, remove it from both track arrays
 * 
 * @param value string
 * @param mask string with 1s and special characters
 * @returns unformatted string
 */
export function unformatMask(value: string, mask: string): string {
  let unformattedValue = '';

  if (!value || !mask) {
    return unformattedValue;
  }

  const valueTrack = value.split('');
  const maskTrack = mask.split('');

  while (valueTrack.length > 0 && maskTrack.length > 0) {
    const valueChar = valueTrack[0];
    const maskChar = maskTrack[0];

    if (maskChar === '1') {
      unformattedValue += valueChar;
      valueTrack.shift();
      maskTrack.shift();
      continue;
    } else {
      valueTrack.shift();
      maskTrack.shift();
      continue;
    }
  }

  return unformattedValue;
}
