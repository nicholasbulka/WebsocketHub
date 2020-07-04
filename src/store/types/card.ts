// src/store/types/card.ts
import { Item } from './util';
import { AnyAction } from 'redux';

export interface Card extends Item{
  suit: string
  value: string
  cardId: string // 1-52
  parentId: string //
  faceUp: boolean
  tsType: string

}
export interface CardState {
  cards: Card[]
}

export const FLIP_CARD = 'FLIP_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const CREATE_CARD = 'CREATE_CARD';

interface FlipCard extends AnyAction{
  type: typeof FLIP_CARD
  cardId: string
  faceUp: boolean
}


interface MoveCard extends AnyAction{
  type: typeof MOVE_CARD
  cardId: string
}

interface CreateCard extends AnyAction{
  type: typeof CREATE_CARD
  card: Card
}

export type CardActionTypes = FlipCard | MoveCard | CreateCard
