import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function QuestionMarkCircleIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      {...omit(props, ['color'])}
      fill="none"
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 18.01L12.01 17.9989"
        stroke={strokeColor}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
