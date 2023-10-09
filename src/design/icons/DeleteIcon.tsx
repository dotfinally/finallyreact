import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function DeleteIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';
  
  return (
    <svg
    tabIndex={0} aria-label="delete-icon"
      {...omit(props, ['color'])}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <rect width="48" height="48" fill="none" />
        </g>
        <g>
          <path fill={strokeColor} d="M43,8.8a2.3,2.3,0,0,1-.6,1.6A1.7,1.7,0,0,1,41,11H29a2,2,0,0,1-2-2V7H21V9a2,2,0,0,1-2,2H7.1A2.1,2.1,0,0,1,5,9.2a2.3,2.3,0,0,1,.6-1.6A1.7,1.7,0,0,1,7,7H17V5a2,2,0,0,1,2-2H29a2,2,0,0,1,2,2V7h9.9A2.1,2.1,0,0,1,43,8.8Z" />
          <path fill={strokeColor} d="M34.8,16.8,32.4,41H15.6L13.2,16.8a2,2,0,0,0-2-1.8h0a2,2,0,0,0-2,2.2l2.6,26a2,2,0,0,0,2,1.8H34.2a2,2,0,0,0,2-1.8l2.6-26a2,2,0,0,0-2-2.2h0A2,2,0,0,0,34.8,16.8Z" />
        </g>
      </g>
    </svg>
  );
}
