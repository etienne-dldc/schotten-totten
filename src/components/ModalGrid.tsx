import React from "react";
import {
  FamilyName,
  FamilyNum,
  All_FAMILY_NAMES,
  ALL_FAMILY_NUMS
} from "../data";
import { Card } from "./Card";

interface Props {
  used: Set<string>;
  onSelect: (family: FamilyName, num: FamilyNum) => void;
  close: () => void;
}

export const ModalGrid: React.FC<Props> = ({ close, onSelect, used }) => {
  return (
    <div
      className="add-layer"
      onClick={e => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className="add-modal">
        {All_FAMILY_NAMES.map(family => {
          return (
            <div key={family} className="add-modal-column">
              {ALL_FAMILY_NUMS.map(num => {
                const isUsed = used.has(`${family}_${num}`);
                return (
                  <Card
                    key={num}
                    family={family}
                    color={isUsed ? "Grey" : undefined}
                    size={50}
                    num={num}
                    onClick={
                      isUsed
                        ? undefined
                        : () => {
                            onSelect(family, num);
                            close();
                          }
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
