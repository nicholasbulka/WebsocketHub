export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface Item {
  itemId: string
  location: Vec3
}

export const UPDATE_STORE_IN_REDIS = 'UPDATE_STORE_IN_REDIS';
export const SET_REDIS_KEY = 'SET_REDIS_KEY';
