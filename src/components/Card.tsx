import React from "react";
import { COLORS, ColorName, FamilyNum, FamilyName } from "../data";
import { Icon } from "./Icon";
import { Size } from "../utils";

const BORDER_RATIO = 0.06;
const RADIUS_RATIO = 0.1;

export type Direction = "vertical" | "horizontal";

interface Props {
  family?: FamilyName;
  color?: ColorName;
  num?: FamilyNum;
  plus?: boolean;
  active?: boolean;
  className?: string;
  size?: number;
  onClick?: () => void;
  direction?: Direction;
}

export function getCardSize(size: number, direction: Direction): Size {
  const borderSize = size * BORDER_RATIO;
  const main = size + borderSize * 2;
  const secondary = size * 2 + borderSize * 2;
  const [width, height] =
    direction === "vertical" ? [main, secondary] : [secondary, main];
  return { width, height };
}

export const Card: React.FC<Props> = ({
  num,
  family: icon,
  color = icon,
  plus = false,
  active = false,
  className = "",
  direction = "horizontal",
  size = 50,
  onClick
}) => {
  const colorResolved = color || "Grey";
  const borderSize = size * BORDER_RATIO;
  const borderRadius = size * RADIUS_RATIO;
  const col = COLORS[colorResolved];
  const cardSize = getCardSize(size, direction);

  return (
    <div
      className={[
        "card",
        onClick ? "card-button" : "",
        active ? "card-active" : "",
        className
      ].join(" ")}
      style={{
        ...{ "--card-color": col },
        borderWidth: borderSize,
        borderRadius,
        flexDirection: direction === "vertical" ? "column" : "row",
        ...cardSize
      }}
      onClick={onClick}
    >
      {plus ? (
        <Icon size={size} color={color} icon="+" />
      ) : (
        <>
          {icon && <Icon size={size} color={color} icon={icon} />}
          {num && <Icon size={size} color={color} icon={num} />}
        </>
      )}
    </div>
  );
};
