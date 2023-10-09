import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function EditIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="edit-icon"
      {...omit(props, ['color'])}
      fill={strokeColor}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>pencil</title>
      <path d="M19.28 10.32c0-0.24-0.080-0.44-0.24-0.6l-3.12-3.12c-0.32-0.32-0.84-0.32-1.2 0l-2.36 2.36-11.32 11.36c-0.12 0.12-0.2 0.28-0.24 0.44l-0.8 3.92c-0.040 0.28 0.040 0.56 0.24 0.76 0.16 0.16 0.36 0.24 0.6 0.24 0.040 0 0.12 0 0.16 0l3.92-0.8c0.16-0.040 0.32-0.12 0.44-0.24l13.68-13.68c0.16-0.2 0.24-0.4 0.24-0.64zM4.32 23.24l-2.44 0.48 0.52-2.4 10.56-10.56 1.92 1.92-10.56 10.56zM16.080 11.52l-1.92-1.92 1.2-1.2 1.92 1.92-1.2 1.2z"></path>
    </svg>
  );
}
