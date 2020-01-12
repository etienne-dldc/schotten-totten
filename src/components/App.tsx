import React from "react";
import { Column } from "./Column";
import produce from "immer";
import { ModalGrid } from "./ModalGrid";
import { ColumData } from "../utils";
import { Hand } from "./Hand";
import { HalfName } from "./Half";

interface AddToColumn {
  column: number;
  half: "top" | "bottom";
}

type Columns = Array<ColumData>;

export const App: React.FC = () => {
  const [columns, setColumns] = React.useState<Columns>([
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] },
    { top: [], bottom: [] }
  ]);
  const [hand, setHand] = React.useState<Hand>([
    null,
    null,
    null,
    null,
    null,
    null
  ]);
  const [addToColumn, setAddToColumn] = React.useState<null | AddToColumn>(
    null
  );
  const [addToHand, setAddToHand] = React.useState<null | number>(null);
  const [playHand, setPlayHand] = React.useState<null | number>(null);
  const [selectedColumn, setSelectedColumn] = React.useState<null | number>(
    null
  );

  const usedCards = React.useMemo(() => {
    const used = new Set<string>();
    columns.forEach(col => {
      [...col.top, ...col.bottom].forEach(ref => {
        used.add(`${ref.family}_${ref.num}`);
      });
    });
    hand.forEach(ref => {
      if (ref) {
        used.add(`${ref.family}_${ref.num}`);
      }
    });
    return used;
  }, [columns, hand]);

  const playing = playHand !== null ? hand[playHand]! : null;

  const onCardClick = React.useCallback(
    (column: number, half: HalfName) => {
      if (playing) {
        setColumns(
          produce((draft: Columns) => {
            draft[column][half].push({
              ...playing
            });
          })
        );
        setHand(
          produce((draft: Hand) => {
            draft[playHand!] = null;
          })
        );
        setPlayHand(null);
      } else {
        setAddToColumn({ column, half });
      }
    },
    [playHand, playing]
  );

  return (
    <>
      <div>
        <div className="columns">
          {columns.map((col, i) => (
            <Column
              isActive={i === selectedColumn}
              playing={playing}
              column={col}
              index={i}
              key={i}
              onCardClick={onCardClick}
              onBorneClick={column => {
                setSelectedColumn(prev => (prev === column ? null : column));
              }}
            />
          ))}
        </div>
        <Hand
          hand={hand}
          onAddCard={i => setAddToHand(i)}
          onCardClick={i => {
            setPlayHand(prev => (prev === i ? null : i));
          }}
          playHand={playHand}
        />
      </div>
      {addToColumn && (
        <ModalGrid
          close={() => {
            setAddToColumn(null);
          }}
          used={usedCards}
          onSelect={(family, num) => {
            setColumns(
              produce((draft: Columns) => {
                draft[addToColumn.column][addToColumn.half].push({
                  family: family,
                  num
                });
              })
            );
          }}
        />
      )}
      {addToHand !== null && (
        <ModalGrid
          close={() => {
            setAddToHand(null);
          }}
          used={usedCards}
          onSelect={(family, num) => {
            setHand(
              produce((draft: Hand) => {
                draft[addToHand] = {
                  family: family,
                  num
                };
              })
            );
          }}
        />
      )}
    </>
  );
};
