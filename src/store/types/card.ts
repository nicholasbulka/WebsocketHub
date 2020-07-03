// src/store/types/card.ts
import { Vec3 } from './util';

export interface Card {
  suit: string
  value: string
  cardId: string // 1-52
  cardCollectionId: string //
  location: Vec3
  faceUp: boolean
  itemId: string // unique to card, unique across card collections
  tsType: string

}
export interface CardState {
  cards: Card[]
}

export const FLIP_CARD = 'FLIP_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const CREATE_CARD = 'CREATE_CARD';

interface FlipCard {
  type: typeof FLIP_CARD
  cardId: string
  faceUp: boolean
}


interface MoveCard {
  type: typeof MOVE_CARD
  cardId: string
  location: Vec3
}

interface CreateCard {
  type: typeof CREATE_CARD
  card: Card
}

export type CardActionTypes = FlipCard | MoveCard | CreateCard
