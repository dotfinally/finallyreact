import { checkHex, omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function MoveIcon(props: Props) {
  const strokeColor = checkHex(props.color) ? props.color : props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      {...omit(props, ['color'])}
      fill={strokeColor}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1805.937 276v1368.756H1920V276h-114.063Zm-739.106 73.765-80.642 80.642 473.02 473.02H0v113.948h1459.208l-473.02 473.02 80.643 80.642 610.694-610.693-610.694-610.58Z"
        fillRule="evenodd"
      />
    </svg>
  );
}
