import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function WarningIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg {...omit(props, ['color'])} width={props.width || 42} height={props.height || 42} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 95,90 5,90" stroke={strokeColor} strokeWidth="4" fill="none" strokeLinejoin="round" 
        strokeLinecap="round"/>
      <circle cx="50" cy="40" r="5" fill={strokeColor} />
      <rect x="45" y="50" width="10" height="25" fill={strokeColor} />
    </svg>
  );
}
