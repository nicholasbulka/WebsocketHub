// src/store/types/cardcollection.ts
import { Item } from './util';
import { AnyAction } from 'redux';

export interface CardCollection extends Item{
  cardCollectionId: string
  tsType: string

}

export interface CardCollectionState {
  cardCollections: CardCollection[]
}

export const FLIP_CARD_COLLECTION = 'FLIP_CARD_COLLECTION';
export const MOVE_CARD_COLLECTION = 'MOVE_CARD_COLLECTION';
export const CREATE_CARD_COLLECTION = 'CREATE_CARD_COLLECTION';

interface FlipCardCollection extends AnyAction{
  type: typeof FLIP_CARD_COLLECTION
  cardId: string
}

interface MoveCardCollection extends AnyAction{
  type: typeof MOVE_CARD_COLLECTION
  cardId: string
}

interface CreateCardCollection extends AnyAction{
  type: typeof CREATE_CARD_COLLECTION
  cardCollection: CardCollection

}

export type CardCollectionActionTypes = FlipCardCollection | MoveCardCollection | CreateCardCollection
