import { checkHex, omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function StarFilledIcon(props: Props) {
  const fillColor = checkHex(props.color)
    ? props.color
    : props.color
    ? `var(--${props.color})`
    : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="star-filled-icon"
      {...omit(props, ['color'])}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="50,5 60,35 95,35 65,50 75,80 50,65 25,80 35,50 5,35 40,35"
        fill={fillColor}
        stroke="none"
      />
    </svg>
  );
}
