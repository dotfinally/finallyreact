import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
}

export function XIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';
  
  return (
    <svg {...props} width={props.width || 42} height={props.height || 42} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="10" x2="90" y2="90" stroke={strokeColor} strokeWidth="5" />
      <line x1="90" y1="10" x2="10" y2="90" stroke={strokeColor} strokeWidth="5" />
    </svg>
  );
}
