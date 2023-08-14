const { filterClassName } = require('./classFilter');

describe('filterClassName - clean given classes', () => {
  it('should return the given class', () => {
    expect(filterClassName('m-2 stone-8 italics')).toBe('m-2 stone-8 italics');
  });

  it('should return the given class without a space', () => {
    expect(filterClassName(' m-2 stone-8 italics')).toBe('m-2 stone-8 italics');
  });

  it('should remove duplicate classes', () => {
    expect(filterClassName('m-2 stone-8 italics stone-8')).toBe('m-2 stone-8 italics');
  });

  it('should return empty string if undefined', () => {
    expect(filterClassName(undefined)).toBe('');

    expect(filterClassName(null)).toBe('');

    expect(filterClassName('')).toBe('');

    expect(filterClassName(' ')).toBe('');
  });
});

describe('filterClassName - combine custom classes', () => {
  it('should return the a combination of original and custom classes', () => {
    expect(filterClassName('m-2 stone-8 italics', 'custom-class')).toBe('m-2 stone-8 italics custom-class');
  });

  it('should return a combo without edge spaces', () => {
    expect(filterClassName('m-2 stone-8 italics', ' custom-class ')).toBe('m-2 stone-8 italics custom-class');
  });

  it('should remove duplicate classes', () => {
    expect(filterClassName('m-2 stone-8 italics', 'custom-class custom-class stone-8')).toBe(
      'm-2 italics custom-class stone-8'
    );
  });

  it('should return empty string if undefined', () => {
    expect(filterClassName('stone-8', undefined)).toBe('stone-8');

    expect(filterClassName('stone-8', null)).toBe('stone-8');

    expect(filterClassName('stone-8', '')).toBe('stone-8');

    expect(filterClassName('stone-8', ' ')).toBe('stone-8');
  });
});

describe('filterClassName - combos', () => {
  test('returns custom and value class when both exist', () => {
    expect(filterClassName('h-2 stone-8', 'h-10')).toBe('stone-8 h-10');
  });

  test('returns custom and value class when both exist in different order', () => {
    expect(filterClassName('flex custom-class', 'inline-flex')).toBe('custom-class inline-flex');
  });

  test('returns combined classes when no matching section exists', () => {
    expect(filterClassName('flex', 'stone-8')).toBe('flex stone-8');
  });

  test('combined colors', () => {
    expect(filterClassName('green-3', 'green-7')).toBe('green-7');
    expect(filterClassName('green-3', 'green-7 red-3')).toBe('green-7 red-3');
    expect(filterClassName('green-3', 'green-7 flex')).toBe('green-7 flex');
    expect(filterClassName('green-3 pink-9', 'green-2')).toBe('green-2');

    expect(filterClassName('hover:green-3 green-5', 'green-7 red-3')).toBe('green-7 red-3');
    expect(filterClassName('hover:green-3', 'hover:green-10')).toBe('hover:green-10');
  });

  test('combined border colors', () => {
    expect(filterClassName('border-green-3', 'border-green-7')).toBe('border-green-7');
    expect(filterClassName('border-green-3', 'border-green-7 border-red-3')).toBe('border-green-7 border-red-3');
    expect(filterClassName('border-green-3', 'border-green-7 flex')).toBe('border-green-7 flex');
    expect(filterClassName('border-green-3 border-pink-9', 'border-green-2')).toBe('border-green-2');

    expect(filterClassName('hover:border-green-3 border-green-5', 'border-green-7 border-red-3')).toBe(
      'border-green-7 border-red-3'
    );
    expect(filterClassName('hover:border-green-3', 'hover:border-green-10')).toBe('hover:border-green-10');
  });

  test('combined transition', () => {
    expect(filterClassName('transition-opacity-ease-out', 'transition-transform-2-ease-quick')).toBe(
      'transition-transform-2-ease-quick'
    );
  });

  test('combined transform', () => {
    expect(filterClassName('rotate-45', 'translate-50-25 -rotate-45')).toBe('translate-50-25 -rotate-45');
  });

  test('combined flex', () => {
    expect(filterClassName('flex', 'inline-flex')).toBe('inline-flex');
    expect(filterClassName('flex', 'inline-flex contents')).toBe('inline-flex contents');
    expect(filterClassName('flex', 'inline-flex contents table-column')).toBe('inline-flex contents table-column');
    expect(filterClassName('table-column ruby', 'inline-flex')).toBe('inline-flex');
    expect(filterClassName('table-column ruby', 'inline-flex contents')).toBe('inline-flex contents');
    expect(filterClassName('block none', 'ruby-text flex')).toBe('ruby-text flex');
  });

  test('combined box-shadow', () => {
    expect(filterClassName('box-shadow', 'box-shadow-inset')).toBe('box-shadow-inset');
    expect(filterClassName('box-shadow box-shadow-inset-dark', 'flex')).toBe('box-shadow box-shadow-inset-dark flex');

    expect(filterClassName('hover:box-shadow', 'hover:box-shadow-inset')).toBe('hover:box-shadow-inset');
  });

  test('combined opacity', () => {
    expect(filterClassName('opacity-0', 'opacity-100')).toBe('opacity-100');
    expect(filterClassName('opacity-0', 'opacity-100 flex')).toBe('opacity-100 flex');
    expect(filterClassName('opacity-0 flex', 'opacity-100')).toBe('flex opacity-100');
  });

  test('combined position', () => {
    expect(filterClassName('absolute', 'relative')).toBe('relative');
    expect(filterClassName('absolute', 'relative flex')).toBe('relative flex');
    expect(filterClassName('flex', 'relative absolute')).toBe('flex relative absolute');
  });

  test('combined justify-content', () => {
    expect(filterClassName('justify-content-center', 'justify-content-start')).toBe('justify-content-start');
    expect(filterClassName('justify-content-center', 'justify-content-start flex')).toBe('justify-content-start flex');
    expect(filterClassName('flex', 'justify-content-start justify-content-center')).toBe(
      'flex justify-content-start justify-content-center'
    );
  });

  test('combined align-items', () => {
    expect(filterClassName('align-items-center', 'align-items-start')).toBe('align-items-start');
    expect(filterClassName('align-items-center', 'align-items-start flex')).toBe('align-items-start flex');
    expect(filterClassName('flex', 'align-items-start align-items-center')).toBe(
      'flex align-items-start align-items-center'
    );
  });

  test('combined align-content', () => {
    expect(filterClassName('align-content-center', 'align-content-start')).toBe('align-content-start');
    expect(filterClassName('align-content-center', 'align-content-start flex')).toBe('align-content-start flex');
    expect(filterClassName('flex', 'align-content-start align-content-center')).toBe(
      'flex align-content-start align-content-center'
    );
  });

  test('combined align-self', () => {
    expect(filterClassName('align-self-center', 'align-self-start')).toBe('align-self-start');
    expect(filterClassName('align-self-center', 'align-self-start flex')).toBe('align-self-start flex');
    expect(filterClassName('flex', 'align-self-start align-self-center')).toBe(
      'flex align-self-start align-self-center'
    );
  });

  test('combined flex-direction', () => {
    expect(filterClassName('flex-row', 'flex-column')).toBe('flex-column');
    expect(filterClassName('flex-row', 'flex-column')).toBe('flex-column');
    expect(filterClassName('flex', 'flex-column flex-row')).toBe('flex-column flex-row');
  });

  test('combined flex-wrap', () => {
    expect(filterClassName('flex-wrap', 'flex-nowrap')).toBe('flex-nowrap');
    expect(filterClassName('flex-wrap', 'flex-nowrap flex')).toBe('flex-nowrap flex');
    expect(filterClassName('flex', 'flex-nowrap flex-wrap')).toBe('flex-nowrap flex-wrap');
  });

  test('combined vertical-align', () => {
    expect(filterClassName('vertical-align-top', 'vertical-align-middle')).toBe('vertical-align-middle');
    expect(filterClassName('vertical-align-top', 'vertical-align-middle flex')).toBe('vertical-align-middle flex');
    expect(filterClassName('flex', 'vertical-align-middle vertical-align-top')).toBe(
      'flex vertical-align-middle vertical-align-top'
    );
  });

  test('combined margin', () => {
    expect(filterClassName('m-0', 'm-1')).toBe('m-1');
    expect(filterClassName('m-0', 'm-1 flex')).toBe('m-1 flex');
    expect(filterClassName('m-0 flex', 'm-1')).toBe('flex m-1');

    expect(filterClassName('-m-0', 'm-1 -m-2')).toBe('m-1 -m-2');
    expect(filterClassName('-m-0', 'm-1 flex')).toBe('m-1 flex');

    expect(filterClassName('ml-2', 'mx-2')).toBe('mx-2');
    expect(filterClassName('my-2', 'my-3 flex')).toBe('my-3 flex');
  });

  test('combined padding', () => {
    expect(filterClassName('p-0', 'p-1')).toBe('p-1');
    expect(filterClassName('p-0', 'p-1 flex')).toBe('p-1 flex');
    expect(filterClassName('p-0 flex', 'p-1')).toBe('flex p-1');

    expect(filterClassName('py-2', 'py-3 flex')).toBe('py-3 flex');
    expect(filterClassName('px-2', 'px-3 flex')).toBe('px-3 flex');
    expect(filterClassName('px-1/2 py-1/3', 'flex')).toBe('px-1/2 py-1/3 flex');

    expect(filterClassName('-p-0', 'p-1 -p-2')).toBe('p-1 -p-2');
    expect(filterClassName('-p-0', 'p-1 flex')).toBe('p-1 flex');
  });

  test('combined height', () => {
    expect(filterClassName('h-0', 'h-1')).toBe('h-1');
    expect(filterClassName('h-0', 'h-1 flex')).toBe('h-1 flex');
    expect(filterClassName('h-0 flex', 'h-1')).toBe('flex h-1');

    expect(filterClassName('min-h-3', 'min-h-1')).toBe('min-h-1');
    expect(filterClassName('min-h-3', 'min-h-1 flex')).toBe('min-h-1 flex');
    expect(filterClassName('min-h-3 h-3 flex', 'min-h-1')).toBe('h-3 flex min-h-1');

    expect(filterClassName('max-h-3', 'max-h-1')).toBe('max-h-1');
    expect(filterClassName('max-h-3', 'max-h-1 flex')).toBe('max-h-1 flex');
    expect(filterClassName('max-h-3 h-3 flex', 'max-h-1')).toBe('h-3 flex max-h-1');
  });

  test('combined width', () => {
    expect(filterClassName('w-0', 'w-1')).toBe('w-1');
    expect(filterClassName('w-0', 'w-1 flex')).toBe('w-1 flex');
    expect(filterClassName('w-0 flex', 'w-1')).toBe('flex w-1');

    expect(filterClassName('min-w-3', 'min-w-1')).toBe('min-w-1');
    expect(filterClassName('min-w-3', 'min-w-1 flex')).toBe('min-w-1 flex');
    expect(filterClassName('min-w-3 w-3 flex', 'min-w-1')).toBe('w-3 flex min-w-1');

    expect(filterClassName('max-w-3', 'max-w-1')).toBe('max-w-1');
    expect(filterClassName('max-w-3', 'max-w-1 flex')).toBe('max-w-1 flex');
    expect(filterClassName('max-w-3 w-3 flex', 'max-w-1')).toBe('w-3 flex max-w-1');
  });

  test('combined left', () => {
    expect(filterClassName('left-0', 'left-1')).toBe('left-1');
    expect(filterClassName('left-0', 'left-1 flex')).toBe('left-1 flex');
    expect(filterClassName('left-0 flex', 'left-1')).toBe('flex left-1');

    expect(filterClassName('-left-0', 'left-1 -left-2')).toBe('left-1 -left-2');
    expect(filterClassName('-left-0', 'left-1 flex')).toBe('left-1 flex');
  });

  test('combined right', () => {
    expect(filterClassName('right-0', 'right-1')).toBe('right-1');
    expect(filterClassName('right-0', 'right-1 flex')).toBe('right-1 flex');
    expect(filterClassName('right-0 flex', 'right-1')).toBe('flex right-1');

    expect(filterClassName('-right-0', 'right-1 -right-2')).toBe('right-1 -right-2');
    expect(filterClassName('-right-0', 'right-1 flex')).toBe('right-1 flex');
  });

  test('combined top', () => {
    expect(filterClassName('top-0', 'top-1')).toBe('top-1');
    expect(filterClassName('top-0', 'top-1 flex')).toBe('top-1 flex');
    expect(filterClassName('top-0 flex', 'top-1')).toBe('flex top-1');

    expect(filterClassName('-top-0', 'top-1 -top-2')).toBe('top-1 -top-2');
    expect(filterClassName('-top-0', 'top-1 flex')).toBe('top-1 flex');
  });

  test('combined bottom', () => {
    expect(filterClassName('bottom-0', 'bottom-1')).toBe('bottom-1');
    expect(filterClassName('bottom-0', 'bottom-1 flex')).toBe('bottom-1 flex');
    expect(filterClassName('bottom-0 flex', 'bottom-1')).toBe('flex bottom-1');

    expect(filterClassName('-bottom-0', 'bottom-1 -bottom-2')).toBe('bottom-1 -bottom-2');
    expect(filterClassName('-bottom-0', 'bottom-1 flex')).toBe('bottom-1 flex');
  });

  test('combined font-size', () => {
    expect(filterClassName('text', 'text-sm')).toBe('text-sm');
    expect(filterClassName('text', 'text-sm flex')).toBe('text-sm flex');
    expect(filterClassName('text-extra-extra-large flex', 'text-medium text-xs')).toBe('flex text-medium text-xs');
  });

  test('combined font-transform', () => {
    expect(filterClassName('text-lowercase', 'uppercase')).toBe('uppercase');
    expect(filterClassName('lowercase', 'text-uppercase flex')).toBe('text-uppercase flex');
    expect(filterClassName('text-normal flex', 'text-normal')).toBe('flex text-normal');
  });

  test('combined font-weight', () => {
    expect(filterClassName('font-normal', 'font-bold')).toBe('font-bold');
    expect(filterClassName('font-extralight', 'bold flex')).toBe('bold flex');
    expect(filterClassName('font-normal flex', 'regular')).toBe('flex regular');
  });

  test('combined font-style', () => {
    expect(filterClassName('italic', 'italic')).toBe('italic');
    expect(filterClassName('normal', 'italic flex')).toBe('italic flex');
    expect(filterClassName('italic flex', 'italic')).toBe('flex italic');

    expect(filterClassName('hover:italic', 'hover:normal')).toBe('hover:normal');
    expect(filterClassName('hover:italic', 'hover:normal flex')).toBe('hover:normal flex');
    expect(filterClassName('hover:italic flex', 'hover:normal')).toBe('flex hover:normal');
  });

  test('combined text-decoration', () => {
    expect(filterClassName('underline', 'underline')).toBe('underline');
    expect(filterClassName('underline', 'line-through flex')).toBe('line-through flex');
    expect(filterClassName('underline flex', 'underline')).toBe('flex underline');

    expect(filterClassName('hover:strikethrough', 'hover:underline')).toBe('hover:underline');
    expect(filterClassName('hover:underline', 'hover:strikethrough flex')).toBe('hover:strikethrough flex');
    expect(filterClassName('hover:underline flex', 'hover:overline')).toBe('flex hover:overline');
  });

  test('combined white-space', () => {
    expect(filterClassName('nowrap', 'wrap')).toBe('wrap');
    expect(filterClassName('wrap', 'nowrap flex')).toBe('nowrap flex');
    expect(filterClassName('pre truncate nowrap', 'pre wrap wrap')).toBe('pre wrap');
  });

  test('combined text-align', () => {
    expect(filterClassName('text-left', 'text-right')).toBe('text-right');
    expect(filterClassName('text-right', 'text-left flex')).toBe('text-left flex');
    expect(filterClassName('text-center', 'text-center')).toBe('text-center');
  });

  test('combined visibility', () => {
    expect(filterClassName('visible', 'invisible')).toBe('invisible');
    expect(filterClassName('invisible', 'visible flex')).toBe('visible flex');
    expect(filterClassName('visible', 'visible')).toBe('visible');

    expect(filterClassName('hover:invisible', 'hover:visible')).toBe('hover:visible');
    expect(filterClassName('hover:visible', 'hover:invisible flex')).toBe('hover:invisible flex');
  });

  test('combined border', () => {
    expect(filterClassName('border-1', 'border-2')).toBe('border-2');
    expect(filterClassName('border-1', 'border-2 flex')).toBe('border-2 flex');
    expect(filterClassName('border-2 flex', 'border-2')).toBe('flex border-2');

    expect(filterClassName('border-2', 'border-4')).toBe('border-4');
    expect(filterClassName('border-2', 'border-4 flex')).toBe('border-4 flex');
    expect(filterClassName('border-2 flex', 'border-4')).toBe('flex border-4');

    expect(filterClassName('border-2', 'border-0')).toBe('border-0');
    expect(filterClassName('border-2', 'border-0 flex')).toBe('border-0 flex');
    expect(filterClassName('border-2 flex', 'border-0')).toBe('flex border-0');
  });

  test('combined border-radius', () => {
    expect(filterClassName('rounded-3', 'rounded-2')).toBe('rounded-2');
    expect(filterClassName('rounded-8', 'rounded-2 flex')).toBe('rounded-2 flex');
    expect(filterClassName('rounded-2 flex', 'rounded-2')).toBe('flex rounded-2');

    expect(filterClassName('rounded-2', 'rounded-4')).toBe('rounded-4');
    expect(filterClassName('rounded-2', 'rounded-4 flex')).toBe('rounded-4 flex');
    expect(filterClassName('rounded-2 flex', 'rounded-4')).toBe('flex rounded-4');

    expect(filterClassName('rounded-2', 'rounded-0')).toBe('rounded-0');
    expect(filterClassName('rounded-2', 'rounded-0 flex')).toBe('rounded-0 flex');
    expect(filterClassName('rounded-2 flex', 'rounded-0')).toBe('flex rounded-0');
  });

  test('combined cursor', () => {
    expect(filterClassName('cursor-pointer', 'cursor-auto')).toBe('cursor-auto');
    expect(filterClassName('cursor-pointer', 'cursor-auto flex')).toBe('cursor-auto flex');
    expect(filterClassName('cursor-auto flex', 'cursor-move')).toBe('flex cursor-move');
  });

  test('combined scroll', () => {
    expect(filterClassName('scroll', 'scroll')).toBe('scroll');
    expect(filterClassName('scroll', 'scroll-x flex')).toBe('scroll-x flex');
  });

  test('combined z-index', () => {
    expect(filterClassName('z-1', 'z-2')).toBe('z-2');
    expect(filterClassName('z-1', 'z-2 flex')).toBe('z-2 flex');
    expect(filterClassName('z-2 flex', 'z-2')).toBe('flex z-2');
  });

  test('combined after-', () => {
    expect(filterClassName('after-close', 'after-copy')).toBe('after-copy');
  });
});
