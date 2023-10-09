import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function InfoIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';
  
  return (
    <svg {...omit(props, ['color'])} width={props.width || 42} height={props.height || 42} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="30" r="5" fill={strokeColor} />
      <rect x="45" y="45" width="10" height="40" fill={strokeColor} />
    </svg>
  );
}
