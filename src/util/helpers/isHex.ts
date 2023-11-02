/**
 * Check if given string is a valid hex color
 *   Both 3 and 6 digits hex colors are supported
 *   Both lower and upper case characters are supported 
 */
export function isHex(color: string): boolean {
  const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;
  return hexRegex.test(color);
}

export function checkHex(color: string): string {
  if (color && isHex(color)) {
    return color;
  }

  return undefined;
}
