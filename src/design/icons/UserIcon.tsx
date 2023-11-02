import { checkHex, omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function UserIcon(props: Props) {
  const strokeColor = checkHex(props.color) ? props.color : props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="user-icon"
      {...omit(props, ['color'])}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="30" r="15" stroke={strokeColor} strokeWidth="5" fill="none" />
      <path
        d="M25,70 C25,60 40,50 50,50 C60,50 75,60 75,70 L75,80 L25,80 L25,70 Z"
        stroke={strokeColor}
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );
}
