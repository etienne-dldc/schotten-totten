import React from "react";
import { getCardSize } from "./Card";
import { Half } from "./Half";
import { CardRef, ColumData } from "../utils";

interface Props {
  isActive: boolean;
  playing: CardRef | null;
  column: ColumData;
  index: number;
  onCardClick: (column: number, half: "top" | "bottom") => void;
  onBorneClick: (column: number) => void;
}

export const Column: React.FC<Props> = ({
  column,
  onCardClick: onAdd,
  playing,
  index,
  onBorneClick,
  isActive
}) => {
  const size = 50;
  const cardSize = getCardSize(size, "horizontal");

  return (
    <div className={["column", isActive ? "column-active" : ""].join(" ")}>
      <Half
        columnIndex={index}
        column={column}
        cardSize={cardSize}
        onCardClick={onAdd}
        playing={playing}
        size={size}
        half="top"
      />
      <div
        className="borne"
        onClick={() => {
          onBorneClick(index);
        }}
      />
      <Half
        columnIndex={index}
        column={column}
        cardSize={cardSize}
        onCardClick={onAdd}
        playing={playing}
        size={size}
        half="bottom"
      />
    </div>
  );
};
