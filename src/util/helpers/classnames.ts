// concatenate multiple classnames into one string
export function classnames(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}

export default classnames;
