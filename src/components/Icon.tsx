import React from "react";
import { ICONS, IconName, ColorName, COLORS } from "../data";

interface Props {
  icon: IconName;
  color?: ColorName;
  size?: number;
}

export const Icon: React.FC<Props> = React.memo(
  ({ size = 50, color = "Grey" as const, icon }) => {
    const col = COLORS[color];
    const path = ICONS[icon];

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 500 500"
      >
        <g fill="none" fillRule="evenodd">
          <path fill={col} d={path} />
        </g>
      </svg>
    );
  }
);
