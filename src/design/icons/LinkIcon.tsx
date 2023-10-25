import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function LinkIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="link-icon"
      {...omit(props, ['color'])}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.23001 18.25C6.17025 18.2535 5.15243 17.8363 4.40001 17.09C3.63614 16.2785 3.22341 15.1983 3.2515 14.0842C3.27958 12.97 3.74622 11.912 4.55001 11.14L8.31001 7.35C9.12729 6.50634 10.2456 6.0209 11.42 6C11.9475 6.00352 12.4692 6.11135 12.9549 6.3173C13.4406 6.52325 13.8807 6.82324 14.25 7.2C15.0243 8.01629 15.4433 9.10627 15.4152 10.231C15.387 11.3557 14.9141 12.4234 14.1 13.2L12.84 14.46C12.7713 14.5337 12.6885 14.5928 12.5965 14.6338C12.5045 14.6748 12.4052 14.6968 12.3045 14.6986C12.2038 14.7004 12.1038 14.6818 12.0104 14.6441C11.917 14.6064 11.8322 14.5503 11.761 14.479C11.6897 14.4078 11.6336 14.323 11.5959 14.2296C11.5582 14.1362 11.5396 14.0362 11.5414 13.9355C11.5432 13.8348 11.5652 13.7355 11.6062 13.6435C11.6472 13.5515 11.7063 13.4687 11.78 13.4L13 12.1C13.5247 11.6076 13.8338 10.9279 13.86 10.2088C13.8862 9.4897 13.6275 8.78933 13.14 8.26C12.6071 7.7953 11.9167 7.55197 11.2102 7.57986C10.5037 7.60774 9.83461 7.90474 9.34001 8.41L5.61001 12.19C5.09513 12.6812 4.79158 13.3535 4.76359 14.0646C4.73559 14.7757 4.98535 15.4698 5.46001 16C5.72088 16.2578 6.03529 16.4551 6.38093 16.5778C6.72657 16.7005 7.09497 16.7456 7.46001 16.71C7.55727 16.7004 7.65547 16.7101 7.74895 16.7386C7.84243 16.7671 7.92934 16.8139 8.00465 16.8762C8.07996 16.9385 8.14218 17.0151 8.18773 17.1015C8.23327 17.188 8.26124 17.2827 8.27001 17.38C8.28956 17.5775 8.23003 17.7747 8.10444 17.9284C7.97885 18.0821 7.79746 18.1798 7.60001 18.2L7.23001 18.25Z"
        fill={strokeColor}
      />
      <path
        d="M12.58 18C12.0525 17.9965 11.5308 17.8887 11.0451 17.6827C10.5594 17.4768 10.1193 17.1768 9.75 16.8C8.97574 15.9837 8.55674 14.8937 8.58486 13.769C8.61297 12.6443 9.08592 11.5766 9.9 10.8L11.16 9.54C11.2287 9.46632 11.3115 9.40721 11.4035 9.36622C11.4955 9.32523 11.5948 9.30319 11.6955 9.30141C11.7962 9.29964 11.8962 9.31816 11.9896 9.35588C12.083 9.3936 12.1678 9.44975 12.239 9.52097C12.3103 9.59218 12.3664 9.67702 12.4041 9.77041C12.4418 9.86379 12.4604 9.96382 12.4586 10.0645C12.4568 10.1652 12.4348 10.2645 12.3938 10.3565C12.3528 10.4485 12.2937 10.5313 12.22 10.6L11 11.9C10.4753 12.3924 10.1662 13.0721 10.14 13.7912C10.1138 14.5103 10.3726 15.2107 10.86 15.74C11.3929 16.2047 12.0833 16.448 12.7898 16.4201C13.4963 16.3923 14.1654 16.0953 14.66 15.59L18.43 11.81C18.9393 11.3134 19.2355 10.6383 19.256 9.92727C19.2766 9.21626 19.0198 8.52513 18.54 8C18.2791 7.7422 17.9647 7.54495 17.6191 7.42224C17.2734 7.29954 16.905 7.2544 16.54 7.29C16.4427 7.29964 16.3445 7.28992 16.2511 7.2614C16.1576 7.23287 16.0707 7.18612 15.9954 7.12382C15.9201 7.06153 15.8578 6.98493 15.8123 6.89846C15.7667 6.81199 15.7388 6.71735 15.73 6.62C15.7104 6.42248 15.77 6.22527 15.8956 6.07156C16.0212 5.91786 16.2025 5.82021 16.4 5.8C16.9821 5.73967 17.5704 5.80779 18.1233 5.99959C18.6762 6.19138 19.1803 6.50216 19.6 6.91C20.3639 7.72153 20.7766 8.80172 20.7485 9.91585C20.7204 11.03 20.2538 12.088 19.45 12.86L15.69 16.65C14.8727 17.4937 13.7544 17.9791 12.58 18Z"
        fill={strokeColor}
      />
    </svg>
  );
}
