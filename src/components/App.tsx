import React from "react";
import { Column } from "./Column";
import { Card } from "./Card";
import produce from "immer";
import { ModalGrid } from "./ModalGrid";
import { ColumData, CardRef } from "../utils";

interface AddToColumn {
  column: number;
  half: "top" | "bottom";
}

type Columns = Array<ColumData>;

type MaybeCard = CardRef | null;

type Hand = [MaybeCard, MaybeCard, MaybeCard, MaybeCard, MaybeCard, MaybeCard];

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

  return (
    <>
      <div>
        <div className="columns">
          {columns.map((col, i) => (
            <Column
              playing={playing}
              column={col}
              key={i}
              onAdd={half => {
                if (playing) {
                  setColumns(
                    produce((draft: Columns) => {
                      draft[i][half].push({
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
                  setAddToColumn({ column: i, half });
                }
              }}
            />
          ))}
        </div>
        <div className="hand">
          {hand.map((ref, i) => {
            if (ref === null) {
              return (
                <Card
                  key={i}
                  size={80}
                  direction="vertical"
                  plus
                  onClick={() => {
                    setAddToHand(i);
                  }}
                />
              );
            }
            return (
              <Card
                key={i}
                size={80}
                direction="vertical"
                family={ref.family}
                num={ref.num}
                active={playHand === i}
                onClick={() => {
                  setPlayHand(prev => (prev === i ? null : i));
                }}
              />
            );
          })}
        </div>
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
