import React from "react";
import { Column } from "./Column";
import produce from "immer";
import { ModalGrid } from "./ModalGrid";
import { ColumData, CardRef } from "../utils";
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
  const [willDeleteCard, setWillDeleteCard] = React.useState<null | CardRef>(
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

  const onAddCardClick = React.useCallback(
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

  const onCardClick = React.useCallback(
    (ref: CardRef) => {
      const isActive =
        willDeleteCard === null
          ? false
          : willDeleteCard.num === ref.num &&
            willDeleteCard.family === ref.family;
      if (isActive) {
        setWillDeleteCard(null);
      } else {
        setWillDeleteCard(ref);
      }
    },
    [willDeleteCard]
  );

  console.log({ columns });

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
              willDeleteCard={willDeleteCard}
              onCardClick={onCardClick}
              onAddCardClick={onAddCardClick}
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
        {willDeleteCard && (
          <button
            onClick={() => {
              setColumns(columns =>
                columns.map(col => ({
                  top: col.top.filter(
                    ref =>
                      !(
                        ref.num === willDeleteCard.num &&
                        ref.family === willDeleteCard.family
                      )
                  ),
                  bottom: col.bottom.filter(
                    ref =>
                      !(
                        ref.num === willDeleteCard.num &&
                        ref.family === willDeleteCard.family
                      )
                  )
                }))
              );
              setWillDeleteCard(null);
            }}
          >
            Remove
          </button>
        )}
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
