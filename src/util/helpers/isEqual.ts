export function isEqual(a, b, visited = new WeakMap()) {
  // Check if the values are primitive values
  if (a === b) return true;

  // If one value is null and the other isn't, they are not equal
  if (a === null || b === null) return false;

  // If one value is undefined and the other isn't, they are not equal
  if (typeof a === 'undefined' || typeof b === 'undefined') return false;

  // If types of a and b are different, they are not equal
  if (typeof a !== typeof b) return false;

  // If either a or b is a function, compare them as functions
  if (typeof a === 'function' || typeof b === 'function') {
    return a?.toString() === b?.toString();
  }

  // If a and b are Date objects, compare their time values
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // If a and b are arrays, compare their elements
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], visited)) return false;
    }
    return true;
  }

  // If a and b are objects, compare their keys and values
  if (typeof a === 'object' && typeof b === 'object') {
    // Check for cycles: if we've already seen this pair, return true.
    // The visited WeakMap maps object 'a' to a Set of objects that have been compared with 'a'
    if (visited.has(a)) {
      if (visited.get(a).has(b)) {
        return true;
      }
    } else {
      visited.set(a, new WeakSet());
    }
    visited.get(a).add(b);

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!isEqual(a[key], b[key], visited)) return false;
    }

    return true;
  }

  // If none of the above conditions are met, the objects are not equal
  return false;
}
