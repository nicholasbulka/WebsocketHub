// src/store/actions/card.ts
import { Vec3 } from '../types/util';

import { Card, FLIP_CARD, MOVE_CARD, CREATE_CARD, CardActionTypes } from '../types/card';

export const flipCard = (cardId: string, faceUp: boolean) : CardActionTypes  => {
  return {
    type: FLIP_CARD,
    cardId,
    faceUp
  }
}

export const moveCard = (cardId: string, location: Vec3) : CardActionTypes =>  {
  return {
    type: MOVE_CARD,
    cardId,
    location

  }
}

export const createCard = (card: Card): CardActionTypes => {
  return {
    type: CREATE_CARD,
    card

  }
}
