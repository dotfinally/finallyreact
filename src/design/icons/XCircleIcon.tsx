import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function XCircleIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';
  
  return (
    <svg {...props} width={props.width || 42} height={props.height || 42} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" stroke={strokeColor} strokeWidth="5" fill="none" />
      <line x1="30" y1="30" x2="70" y2="70" stroke={strokeColor} strokeWidth="5" />
      <line x1="70" y1="30" x2="30" y2="70" stroke={strokeColor} strokeWidth="5" />
    </svg>
  );
}