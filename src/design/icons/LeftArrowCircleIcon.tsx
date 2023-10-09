import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function LeftArrowCircleIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="left-arrow-circle-icon"
      {...omit(props, ['color'])}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="5" fill="none" />
      <line x1="70" y1="50" x2="30" y2="50" stroke={strokeColor} strokeWidth="5" />
      <line x1="47" y1="32" x2="30" y2="50" stroke={strokeColor} strokeWidth="5" />
      <line x1="47" y1="68" x2="30" y2="50" stroke={strokeColor} strokeWidth="5" />
    </svg>
  );
}
