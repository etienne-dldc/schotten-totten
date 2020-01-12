import React from "react";
import { getCardSize } from "./Card";
import { Half } from "./Half";
import { CardRef, ColumData } from "../utils";

interface Props {
  playing: CardRef | null;
  column: ColumData;
  onAdd: (half: "top" | "bottom") => void;
}

export const Column: React.FC<Props> = ({ column, onAdd, playing }) => {
  const size = 50;
  const cardSize = getCardSize(size, "horizontal");

  return (
    <div className="column">
      <Half
        column={column}
        cardSize={cardSize}
        onAdd={onAdd}
        playing={playing}
        size={size}
        half="top"
      />
      <div className="borne" />
      <Half
        column={column}
        cardSize={cardSize}
        onAdd={onAdd}
        playing={playing}
        size={size}
        half="bottom"
      />
    </div>
  );
};
