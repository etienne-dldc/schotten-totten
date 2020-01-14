import React from "react";
import { getCardSize } from "./Card";
import { Half } from "./Half";
import { CardRef, ColumData } from "../utils";

interface Props {
  isActive: boolean;
  playing: CardRef | null;
  column: ColumData;
  index: number;
  willDeleteCard: CardRef | null;
  onAddCardClick: (column: number, half: "top" | "bottom") => void;
  onCardClick: (ref: CardRef) => void;
  onBorneClick: (column: number) => void;
}

export const Column: React.FC<Props> = ({
  column,
  onAddCardClick,
  playing,
  index,
  onBorneClick,
  isActive,
  onCardClick,
  willDeleteCard
}) => {
  const size = 50;
  const cardSize = getCardSize(size, "horizontal");

  return (
    <div className={["column", isActive ? "column-active" : ""].join(" ")}>
      <Half
        columnIndex={index}
        column={column}
        cardSize={cardSize}
        onAddCardClick={onAddCardClick}
        onCardClick={onCardClick}
        playing={playing}
        willDeleteCard={willDeleteCard}
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
        onAddCardClick={onAddCardClick}
        onCardClick={onCardClick}
        playing={playing}
        willDeleteCard={willDeleteCard}
        size={size}
        half="bottom"
      />
    </div>
  );
};
