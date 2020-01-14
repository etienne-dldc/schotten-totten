import React from "react";
import { Card } from "./Card";
import { CardRef, ColumData, Size } from "../utils";

export type HalfName = "top" | "bottom";

interface Props {
  playing: CardRef | null;
  column: ColumData;
  half: HalfName;
  size: number;
  columnIndex: number;
  onAddCardClick: (column: number, half: HalfName) => void;
  onCardClick: (ref: CardRef) => void;
  cardSize: Size;
  willDeleteCard: null | CardRef;
}

export const Half: React.FC<Props> = ({
  column,
  half,
  size,
  playing,
  onAddCardClick,
  onCardClick,
  willDeleteCard,
  cardSize,
  columnIndex
}) => {
  return (
    <div className={`half half-${half}`}>
      {[0, 1, 2].map(i => {
        const ref = column[half][i];
        if (ref) {
          const active =
            willDeleteCard === null
              ? false
              : willDeleteCard.num === ref.num &&
                willDeleteCard.family === ref.family;
          return (
            <Card
              key={i}
              size={size}
              num={ref.num}
              family={ref.family}
              active={active}
              onClick={() => {
                onCardClick(ref);
              }}
            />
          );
        }
        if (i === column[half].length) {
          return (
            <Card
              key={i}
              color="Grey"
              num={playing ? playing.num : undefined}
              family={playing ? playing.family : undefined}
              size={size}
              plus={playing === null}
              className="plus"
              onClick={() => onAddCardClick(columnIndex, half)}
            />
          );
        }
        return <div key={i} style={{ ...cardSize }} />;
      })}
    </div>
  );
};
