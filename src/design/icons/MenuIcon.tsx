import { checkHex, omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function MenuIcon(props: Props) {
  const strokeColor = checkHex(props.color) ? props.color : props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="menu-icon"
      {...omit(props, ['color'])}
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="3" y1="12" x2="21" y2="12" stroke={strokeColor} strokeWidth="2" />
      <line x1="3" y1="6" x2="21" y2="6" stroke={strokeColor} strokeWidth="2" />
      <line x1="3" y1="18" x2="21" y2="18" stroke={strokeColor} strokeWidth="2" />
    </svg>
  );
}
