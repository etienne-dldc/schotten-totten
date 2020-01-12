import { FamilyName, FamilyNum } from "../data";

export interface CardRef {
  family: FamilyName;
  num: FamilyNum;
}

export interface ColumData {
  top: Array<CardRef>;
  bottom: Array<CardRef>;
}

export interface Size {
  width: number;
  height: number;
}

export function sizeFromRatio(
  ratio: number,
  options: { width?: number; height?: number }
): Size {
  if (options.height !== undefined) {
    if (options.width !== undefined) {
      throw new Error("What ?");
    }
    return {
      height: options.height,
      width: options.height * ratio
    };
  }
  if (options.width !== undefined) {
    return { width: options.width, height: options.width / ratio };
  }
  throw new Error("What ?");
}

export function notNil<T>(v: T | null | undefined): T {
  if (v === null || v === undefined) {
    throw new Error("Invariant");
  }
  return v;
}
