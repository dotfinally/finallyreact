// function to omit one or more properties from an object
//
// Usage:
// const obj = { a: 1, b: 2, c: 3 };
// const newObj = omit(obj, ['a', 'c']);
// newObj = { b: 2 }
export function omit(obj: any, keys: string | string[]) {
  if (!obj) {
    return {};
  }

  const newObj = { ...obj };

  if (typeof keys === 'string') {
    delete newObj[keys];
  } else {
    keys.forEach((key) => delete newObj[key]);
  }

  return newObj;
}

export default omit;
