import { checkHex, omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function StarCircleIcon(props: Props) {
  const strokeColor = checkHex(props.color) ? props.color : props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="search-circle-icon"
      {...omit(props, ['color'])}
      fill={strokeColor}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.5 2.2a10.3 10.3 0 1 0 10.3 10.3A10.299 10.299 0 0 0 12.5 2.2zm0 19.6a9.3 9.3 0 1 1 9.3-9.3 9.31 9.31 0 0 1-9.3 9.3zm5.386-11.26l-3.468-.293-1.365-3.262a.619.619 0 0 0-1.155-.001l-1.366 3.263-3.467.293a.606.606 0 0 0-.358 1.097l2.635 2.283-.796 3.405a.607.607 0 0 0 .935.676l2.994-1.82L15.469 18a.727.727 0 0 0 .374.112.574.574 0 0 0 .34-.11.63.63 0 0 0 .221-.68l-.796-3.403 2.635-2.283a.606.606 0 0 0-.357-1.097zm-3.389 3.02l.73 3.124-2.752-1.673-2.752 1.673.73-3.124-2.422-2.099 3.189-.269 1.255-2.997 1.255 2.997 3.189.27z" />
      <path fill="none" d="M0 0h24v24H0z" />
    </svg>
  );
}
