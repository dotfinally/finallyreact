import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function SearchIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="search-icon"
      {...omit(props, ['color'])}
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="7" stroke={strokeColor} strokeWidth="2" fill="none" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={strokeColor} strokeWidth="2" />
    </svg>
  );
}
