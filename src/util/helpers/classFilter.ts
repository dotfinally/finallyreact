const colors = [
  'lava',
  'apple',
  'ruby',
  'red',
  'flamingo',
  'lotus',
  'sakura',
  'pink',
  'monarch',
  'pumpkin',
  'carrot',
  'orange',
  'calico',
  'desert',
  'coffee',
  'brown',
  'sun',
  'banana',
  'corn',
  'yellow',
  'leaf',
  'emerald',
  'frog',
  'green',
  'ocean',
  'sky',
  'blue-rose',
  'blue',
  'grape',
  'lavender',
  'violet',
  'purple',
  'fog',
  'stone',
  'cloud',
  'gray',
  'white',
  'black',
  'transparent'
];

const keys = {
  display: ['flex', 'contents', 'inline', 'block', 'table', 'none', 'ruby'],
  position: ['absolute', 'relative', 'fixed'],
  margin: ['m'],
  marginLeft: ['ml', 'mx'],
  marginRight: ['mr', 'mx'],
  marginTop: ['mt', 'my'],
  marginBottom: ['mb', 'my'],
  padding: ['p'],
  paddingLeft: ['pl', 'px'],
  paddingRight: ['pr', 'px'],
  paddingTop: ['pt', 'py'],
  paddingBottom: ['pb', 'py'],
  fontSize: ['text'],
  textTransform: ['text', 'uppercase', 'lowercase', 'capitalize'],
  fontWeight: ['font', 'thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold'],
  fontStyle: ['normal', 'italic'],
  textDecoration: ['underline', 'text', 'line', 'text', 'strikethrough', 'overline'],
  whiteSpace: ['nowrap', 'truncate', 'wrap', 'pre'],
  textAlign: ['text-left', 'text-center', 'text-right', 'text-justify'],
  visibility: ['visible', 'invisible']
};

function findCategories(value: string): string[] {
  const categories = [];

  for (const key in keys) {
    const keyValues = keys[key];

    for (const keyValue of keyValues) {
      if (value.includes(keyValue) && keyValue.length > 1) {
        categories.push(key);
        break;
      }
    }
  }

  return categories;
}

export function filterClassName(value: string, custom?: string): string {
  const log = false;

  if (log) {
    console.log('value', value, 'inputCustom', custom);
  }

  if (!value) {
    return '';
  }

  if (!custom) {
    return cleanClassName(value);
  }

  let final = {};
  let customString = '';

  const customSplit = custom.split(' ');
  let customHasColor = false;

  for (let i = customSplit.length - 1; i >= 0; i--) {
    const c = customSplit[i];
    const split = c.split('-');

    if (!customHasColor) {
      if (!!colors.find((color) => c.includes(color))) {
        customHasColor = true;
      }
    }

    let base = split[0] || split[1];
    if (!base) {
      continue;
    }
    if (base.includes(':')) {
      base = base.split(':')[1];
    }

    const categories = findCategories(c);

    if (log) {
      console.log('custom', {
        full: c,
        base,
        categories
      });
    }

    final[base] = {
      base,
      full: c,
      categories
    };
    customString = `${c} ${customString}`;
  }

  const valueSplit = value.split(' ');
  let finalString = '';

  for (let i = valueSplit.length - 1; i >= 0; i--) {
    const v = valueSplit[i];
    const split = v.split('-');

    // if custom has a color, ignore any values that have a color
    if (customHasColor) {
      if (!!colors.find((color) => v.includes(color))) {
        continue;
      }
    }

    let base = split[0] || split[1];
    if (!base) {
      continue;
    }
    if (base.includes(':')) {
      base = base.split(':')[1];
    }

    // if final already has the same base, ignore
    if (final[base]) {
      continue;
    }

    const categories = findCategories(v);
    let sameCategory = false;
    for (const f in final) {
      const finalCategories = final[f].categories;
      for (const finalCategory of finalCategories) {
        if (categories.includes(finalCategory)) {
          sameCategory = true;
          break;
        }
      }
      if (sameCategory) {
        break;
      }
    }

    if (sameCategory) {
      continue;
    }

    finalString = `${v} ${finalString}`;
  }

  if (log) {
    console.log('final', final);
  }

  return cleanClassName(`${finalString}${customString}`);
}

// trim whitespace and remove duplicate values
// remove null or undefined values
function cleanClassName(className: string) {
  if (!className) {
    return '';
  }

  const newClassName = className.replace(/undefined/g, '');

  return newClassName
    .split(' ')
    .filter((value, index, self) => {
      return value && self.indexOf(value) === index;
    })
    .join(' ');
}
