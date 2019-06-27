import { IDataItem } from "../api"

import { Actions } from "../actions"

export interface IState {
  trendingGifs: IDataItem[]
  trendingStickers: IDataItem[]
  gifs: IDataItem[]
  stickers: IDataItem[]
  savedGifs: {
    [id: string]: IDataItem
  }
  savedStickers: {
    [id: string]: IDataItem
  }
  isViewingGifs: boolean
}

interface IReducer<TActions> {
  (state: IState, action: TActions): IState
}

export const reducer: IReducer<Actions> = (state, action) => {
  switch (action.type) {
    case "GET_TRENDING_GIFS":
      return {
        ...state,
        trendingGifs: [...state.trendingGifs, ...action.payload]
      }
    case "GET_TRENDING_STICKERS":
      return {
        ...state,
        trendingStickers: [...state.trendingStickers, ...action.payload]
      }
    case "GET_SEARCHED_GIFS":
      return {
        ...state,
        gifs: [...state.gifs, ...action.payload]
      }
    case "GET_SEARCHED_STICKERS":
      return {
        ...state,
        stickers: [...state.stickers, ...action.payload]
      }
    case "CLEAR_SEARCHED":
      return {
        ...state,
        gifs: [],
        stickers: []
      }
    case "SAVE":
      return !action.payload.isSticker
        ? {
            ...state,
            savedGifs: {
              ...state.savedGifs,
              [action.payload.id]: action.payload
            }
          }
        : {
            ...state,
            savedStickers: {
              ...state.savedStickers,
              [action.payload.id]: action.payload
            }
          }
    case "REMOVE":
      if (!action.payload.isSticker) {
        const { [action.payload.id]: _, ...withoutTarget } = state.savedGifs
        return {
          ...state,
          savedGifs: withoutTarget
        }
      } else {
        const { [action.payload.id]: _, ...withoutTarget } = state.savedStickers
        return {
          ...state,
          savedStickers: withoutTarget
        }
      }
    case "SET_VIEW_GIFS": {
      console.log("viewing gifs")
      return {
        ...state,
        isViewingGifs: true
      }
    }
    case "SET_VIEW_STICKERS": {
      console.log("viewing stickers")
      return {
        ...state,
        isViewingGifs: false
      }
    }

    case "LOAD": {
      console.log(action.payload)
      const savedGifs = action.payload.gifsArray.reduce((accum, item) => {
        return {
          ...accum,
          [item.id]: item
        }
      }, {})
      const savedStickers = action.payload.stickersArray.reduce(
        (accum, item) => {
          return {
            ...accum,
            [item.id]: item
          }
        },
        {}
      )

      console.log(savedGifs, savedStickers)
      return {
        ...state,
        savedGifs,
        savedStickers
      }
    }
    default:
      return state
  }
}
