// types.ts
export type DrawMode = 'gt' | 'pred' | 'erase' | 'clear';

export interface GridState {
  gt: boolean[];
  pred: boolean[];
}