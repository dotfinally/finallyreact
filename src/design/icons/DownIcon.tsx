import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function DownIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';
  
  return (
    <svg {...props} width={props.width || 42} height={props.height || 42} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="32" y1="43" x2="50" y2="60" stroke={strokeColor} strokeWidth="5" />
      <line x1="68" y1="43" x2="50" y2="60" stroke={strokeColor} strokeWidth="5" />
    </svg>
  );
}
