import React from "react";
import { CardRef } from "../utils";
import { Card } from "./Card";

type MaybeCard = CardRef | null;

export type Hand = [
  MaybeCard,
  MaybeCard,
  MaybeCard,
  MaybeCard,
  MaybeCard,
  MaybeCard
];

interface Props {
  hand: Hand;
  playHand: number | null;
  onAddCard: (index: number) => void;
  onCardClick: (index: number) => void;
}

export const Hand: React.FC<Props> = ({
  hand,
  onAddCard,
  playHand,
  onCardClick
}) => {
  return (
    <div className="hand">
      {hand.map((ref, i) => {
        if (ref === null) {
          return (
            <Card
              key={i}
              size={70}
              direction="horizontal"
              plus
              onClick={() => {
                onAddCard(i);
              }}
            />
          );
        }
        return (
          <Card
            key={i}
            size={70}
            direction="horizontal"
            family={ref.family}
            num={ref.num}
            active={playHand === i}
            onClick={() => {
              onCardClick(i);
            }}
          />
        );
      })}
    </div>
  );
};
