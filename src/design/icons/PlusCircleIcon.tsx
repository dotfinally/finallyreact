import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function PlusCircleIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';
  
  return (
    <svg {...props} width={props.width || 42} height={props.height || 42} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="5" fill="none" />
      <line x1="25" y1="50" x2="75" y2="50" stroke={strokeColor} strokeWidth="5" />
      <line x1="50" y1="25" x2="50" y2="75" stroke={strokeColor} strokeWidth="5" />
    </svg>
  );
}
