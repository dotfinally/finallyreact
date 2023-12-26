import { checkHex, omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function CheckIcon(props: Props) {
  const strokeColor = checkHex(props.color) ? props.color : props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="check-icon"
      {...omit(props, ['color'])}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="25" y1="50" x2="42" y2="70" stroke={strokeColor} strokeWidth="5" />
      <line x1="40" y1="70" x2="75" y2="30" stroke={strokeColor} strokeWidth="5" />
    </svg>
  );
}
