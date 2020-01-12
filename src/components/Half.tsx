import React from "react";
import { Card } from "./Card";
import { CardRef, ColumData, Size } from "../utils";

interface Props {
  playing: CardRef | null;
  column: ColumData;
  half: "top" | "bottom";
  size: number;
  onAdd: (half: "top" | "bottom") => void;
  cardSize: Size;
}

export const Half: React.FC<Props> = ({
  column,
  half,
  size,
  playing,
  onAdd,
  cardSize
}) => {
  return (
    <div className={`half half-${half}`}>
      {[0, 1, 2].map(i => {
        const ref = column[half][i];
        if (ref) {
          return <Card key={i} size={size} num={ref.num} family={ref.family} />;
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
              onClick={() => onAdd(half)}
            />
          );
        }
        return <div key={i} style={{ ...cardSize }} />;
      })}
    </div>
  );
};
