import { omit } from '@util/index';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export function GearIcon(props: Props) {
  const strokeColor = props.color ? `var(--${props.color})` : 'black';

  return (
    <svg
      tabIndex={0}
      aria-label="gear-icon"
      {...omit(props, ['color'])}
      fill={strokeColor}
      width={props.width || 42}
      height={props.height || 42}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>gear</title>
      <path d="M29 12.256h-1.88c-0.198-0.585-0.405-1.072-0.643-1.541l0.031 0.067 1.338-1.324c0.35-0.3 0.57-0.742 0.57-1.236 0-0.406-0.149-0.778-0.396-1.063l0.002 0.002-3.178-3.178c-0.283-0.246-0.654-0.395-1.061-0.395-0.494 0-0.937 0.221-1.234 0.57l-0.002 0.002-1.332 1.33c-0.402-0.206-0.888-0.413-1.39-0.586l-0.082-0.025 0.009-1.88c0.003-0.040 0.005-0.086 0.005-0.133 0-0.854-0.66-1.554-1.498-1.617l-0.005-0h-4.496c-0.844 0.063-1.505 0.763-1.505 1.617 0 0.047 0.002 0.093 0.006 0.139l-0-0.006v1.879c-0.585 0.198-1.071 0.404-1.54 0.641l0.067-0.031-1.324-1.336c-0.299-0.352-0.742-0.573-1.236-0.573-0.407 0-0.778 0.15-1.063 0.397l0.002-0.002-3.179 3.179c-0.246 0.283-0.396 0.655-0.396 1.061 0 0.494 0.221 0.937 0.57 1.234l0.002 0.002 1.329 1.329c-0.207 0.403-0.414 0.891-0.587 1.395l-0.024 0.082-1.88-0.009c-0.040-0.003-0.086-0.005-0.133-0.005-0.854 0-1.554 0.661-1.617 1.499l-0 0.005v4.495c0.062 0.844 0.763 1.505 1.617 1.505 0.047 0 0.093-0.002 0.139-0.006l-0.006 0h1.88c0.198 0.585 0.404 1.072 0.642 1.541l-0.030-0.066-1.335 1.32c-0.351 0.3-0.572 0.744-0.572 1.239 0 0.407 0.149 0.779 0.396 1.064l-0.002-0.002 3.179 3.178c0.249 0.246 0.591 0.399 0.97 0.399 0.007 0 0.014-0 0.021-0h-0.001c0.515-0.013 0.977-0.231 1.308-0.576l0.001-0.001 1.33-1.33c0.403 0.207 0.891 0.414 1.395 0.587l0.082 0.025-0.009 1.878c-0.003 0.040-0.005 0.086-0.005 0.132 0 0.854 0.661 1.555 1.499 1.617l0.005 0h4.496c0.843-0.064 1.503-0.763 1.503-1.617 0-0.047-0.002-0.093-0.006-0.139l0 0.006v-1.881c0.585-0.198 1.073-0.405 1.543-0.643l-0.067 0.031 1.321 1.333c0.332 0.344 0.793 0.562 1.304 0.574l0.002 0h0.002c0.006 0 0.013 0 0.019 0 0.378 0 0.72-0.151 0.971-0.395l3.177-3.177c0.244-0.249 0.395-0.591 0.395-0.968 0-0.009-0-0.017-0-0.026l0 0.001c-0.012-0.513-0.229-0.973-0.572-1.304l-0.001-0.001-1.331-1.332c0.206-0.401 0.412-0.887 0.586-1.389l0.025-0.083 1.879 0.009c0.040 0.003 0.086 0.005 0.132 0.005 0.855 0 1.555-0.661 1.617-1.5l0-0.005v-4.495c-0.063-0.844-0.763-1.504-1.618-1.504-0.047 0-0.093 0.002-0.138 0.006l0.006-0zM29.004 18.25l-2.416-0.012c-0.020 0-0.037 0.010-0.056 0.011-0.198 0.024-0.372 0.115-0.501 0.249l-0 0c-0.055 0.072-0.103 0.153-0.141 0.24l-0.003 0.008c-0.005 0.014-0.016 0.024-0.020 0.039-0.24 0.844-0.553 1.579-0.944 2.264l0.026-0.049c-0.054 0.1-0.086 0.218-0.086 0.344 0 0.001 0 0.003 0 0.004v-0c-0 0.016 0.003 0.028 0.004 0.045 0.006 0.187 0.080 0.355 0.199 0.481l-0-0 0.009 0.023 1.707 1.709c0.109 0.109 0.137 0.215 0.176 0.176l-3.102 3.133c-0.099-0.013-0.186-0.061-0.248-0.13l-0-0-1.697-1.713c-0.008-0.009-0.022-0.005-0.030-0.013-0.121-0.112-0.28-0.183-0.456-0.193l-0.002-0c-0.020-0.003-0.044-0.005-0.068-0.006l-0.001-0c-0.125 0-0.243 0.032-0.345 0.088l0.004-0.002c-0.636 0.362-1.373 0.676-2.146 0.903l-0.074 0.019c-0.015 0.004-0.025 0.015-0.039 0.020-0.096 0.042-0.179 0.092-0.255 0.149l0.003-0.002c-0.035 0.034-0.066 0.071-0.093 0.11l-0.002 0.002c-0.027 0.033-0.053 0.070-0.075 0.11l-0.002 0.004c-0.033 0.081-0.059 0.175-0.073 0.274l-0.001 0.007c-0.001 0.016-0.010 0.031-0.010 0.047v2.412c0 0.15-0.055 0.248 0 0.25l-4.41 0.023c-0.052-0.067-0.084-0.153-0.084-0.246 0-0.008 0-0.016 0.001-0.024l-0 0.001 0.012-2.412c0-0.017-0.008-0.032-0.010-0.048-0.005-0.053-0.015-0.102-0.030-0.149l0.001 0.005c-0.012-0.053-0.028-0.1-0.048-0.145l0.002 0.005c-0.052-0.086-0.109-0.16-0.173-0.227l0 0c-0.029-0.024-0.062-0.046-0.096-0.066l-0.004-0.002c-0.044-0.030-0.093-0.056-0.146-0.076l-0.005-0.002c-0.014-0.005-0.024-0.016-0.039-0.020-0.847-0.241-1.585-0.554-2.272-0.944l0.051 0.026c-0.099-0.054-0.216-0.086-0.341-0.086h-0c-0.022-0.001-0.040 0.004-0.062 0.005-0.18 0.008-0.342 0.080-0.465 0.193l0.001-0c-0.008 0.008-0.021 0.004-0.029 0.012l-1.705 1.705c-0.107 0.107-0.216 0.139-0.178 0.178l-3.134-3.101c0.012-0.1 0.060-0.187 0.13-0.25l0-0 1.714-1.695 0.011-0.026c0.115-0.123 0.189-0.286 0.197-0.466l0-0.002c0.001-0.021 0.005-0.037 0.005-0.058 0-0.001 0-0.002 0-0.003 0-0.126-0.032-0.245-0.088-0.348l0.002 0.004c-0.365-0.636-0.679-1.371-0.903-2.145l-0.018-0.072c-0.004-0.015-0.016-0.026-0.021-0.041-0.042-0.094-0.090-0.176-0.146-0.25l0.002 0.003c-0.065-0.061-0.136-0.117-0.212-0.165l-0.006-0.003c-0.051-0.025-0.109-0.045-0.171-0.057l-0.005-0.001c-0.029-0.009-0.065-0.016-0.102-0.021l-0.004-0c-0.020-0.002-0.037-0.012-0.058-0.012h-2.412c-0.152 0.002-0.248-0.055-0.25-0.002l-0.022-4.409c0.067-0.052 0.151-0.084 0.244-0.084 0.009 0 0.017 0 0.026 0.001l-0.001-0 2.416 0.012c0.152-0.004 0.292-0.054 0.407-0.136l-0.002 0.002c0.024-0.014 0.044-0.028 0.064-0.043l-0.002 0.001c0.109-0.088 0.191-0.206 0.235-0.341l0.001-0.005c0.003-0.010 0.014-0.014 0.017-0.025 0.242-0.847 0.555-1.583 0.946-2.27l-0.026 0.050c0.054-0.1 0.086-0.218 0.086-0.344 0-0.001 0-0.001 0-0.002v0c0.001-0.019-0.003-0.033-0.004-0.052-0.007-0.184-0.080-0.35-0.197-0.475l0 0-0.010-0.024-1.705-1.705c-0.108-0.11-0.142-0.221-0.176-0.178l3.102-3.134c0.101 0.008 0.189 0.058 0.248 0.131l0.001 0.001 1.697 1.713c0.018 0.018 0.046 0.011 0.065 0.027 0.125 0.121 0.295 0.196 0.483 0.196 0.13 0 0.251-0.036 0.355-0.098l-0.003 0.002c0.636-0.364 1.372-0.677 2.145-0.902l0.072-0.018c0.014-0.004 0.024-0.015 0.038-0.019 0.057-0.021 0.105-0.047 0.151-0.077l-0.003 0.002c0.163-0.090 0.281-0.244 0.321-0.427l0.001-0.004c0.014-0.043 0.025-0.093 0.030-0.145l0-0.003c0.001-0.016 0.009-0.030 0.009-0.046v-2.412c0-0.151 0.056-0.249 0.001-0.25l4.41-0.023c0.052 0.067 0.083 0.152 0.083 0.245 0 0.009-0 0.017-0.001 0.026l0-0.001-0.012 2.412c-0 0.016 0.008 0.030 0.009 0.047 0.005 0.055 0.015 0.106 0.031 0.155l-0.001-0.005c0.071 0.234 0.243 0.419 0.464 0.506l0.005 0.002c0.014 0.005 0.025 0.016 0.039 0.020 0.845 0.242 1.58 0.555 2.265 0.945l-0.050-0.026c0.105 0.060 0.231 0.096 0.366 0.096 0 0 0.001 0 0.001 0h-0c0.183-0.008 0.347-0.082 0.471-0.198l-0 0c0.017-0.015 0.043-0.008 0.059-0.024l1.709-1.705c0.105-0.106 0.213-0.137 0.176-0.176l3.133 3.102c-0.012 0.1-0.059 0.186-0.129 0.249l-0 0-1.715 1.697-0.011 0.026c-0.116 0.123-0.19 0.287-0.198 0.468l-0 0.002c-0.001 0.020-0.005 0.036-0.005 0.056 0 0.001 0 0.002 0 0.003 0 0.126 0.032 0.245 0.088 0.348l-0.002-0.004c0.365 0.636 0.679 1.371 0.902 2.144l0.018 0.071c0.003 0.012 0.016 0.017 0.019 0.028 0.046 0.137 0.127 0.253 0.232 0.339l0.001 0.001c0.019 0.015 0.041 0.030 0.063 0.043l0.003 0.002c0.112 0.080 0.252 0.13 0.402 0.134l0.001 0h2.412c0.152-0.001 0.248 0.057 0.25 0.001l0.021 4.409c-0.065 0.053-0.149 0.085-0.24 0.085-0.010 0-0.019-0-0.029-0.001l0.001 0zM16 11.25c-2.623 0-4.75 2.127-4.75 4.75s2.127 4.75 4.75 4.75c2.623 0 4.75-2.127 4.75-4.75v0c-0.003-2.622-2.128-4.747-4.75-4.75h-0zM16 19.25c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25c1.795 0 3.25 1.455 3.25 3.25v0c-0.002 1.794-1.456 3.248-3.25 3.25h-0z"></path>
    </svg>
  );
}
