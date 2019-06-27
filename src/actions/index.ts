import {
  getTrendingGifs,
  getTrendingStickers,
  getSearchedGifs,
  getSearchedStickers,
  IDataItem
} from "../api"

const GET_TRENDING_GIFS = "GET_TRENDING_GIFS"
const GET_TRENDING_STICKERS = "GET_TRENDING_STICKERS"
const GET_SEARCHED_GIFS = "GET_SEARCHED_GIFS"
const GET_SEARCHED_STICKERS = "GET_SEARCHED_STICKERS"
const CLEAR_SEARCHED = "CLEAR_SEARCHED"
const SAVE = "SAVE"
const REMOVE = "REMOVE"
const SET_VIEW_GIFS = "SET_VIEW_GIFS"
const SET_VIEW_STICKERS = "SET_VIEW_STICKERS"
const LOAD = "LOAD"

interface IAction<TType, TPayload = undefined> {
  type: TType
  payload: TPayload
}

interface ITrendingGifsACAction
  extends IAction<"GET_TRENDING_GIFS", IDataItem[]> {}

export const getTrendingGifsActionCreator = async (
  offset: number
): Promise<ITrendingGifsACAction> => {
  return {
    type: GET_TRENDING_GIFS,
    payload: await getTrendingGifs(`&offset=${offset}`)
  }
}

interface ITrendingStickersACAction
  extends IAction<"GET_TRENDING_STICKERS", IDataItem[]> {}

export const getTrendingStickersActionCreator = async (
  offset: number
): Promise<ITrendingStickersACAction> => {
  return {
    type: GET_TRENDING_STICKERS,
    payload: await getTrendingStickers(`&offset=${offset}`)
  }
}

interface ISearchedGifsACAction
  extends IAction<"GET_SEARCHED_GIFS", IDataItem[]> {}

export const getSearchedGifsActionCreator = async (
  query: string,
  offset: number
): Promise<ISearchedGifsACAction> => {
  return {
    type: GET_SEARCHED_GIFS,
    payload: await getSearchedGifs(`${query}&offset=${offset}`)
  }
}

interface ISearchedStickersACAction
  extends IAction<"GET_SEARCHED_STICKERS", IDataItem[]> {}

export const getSearchedStickersActionCreator = async (
  query: string,
  offset: number
): Promise<ISearchedStickersACAction> => {
  return {
    type: GET_SEARCHED_STICKERS,
    payload: await getSearchedStickers(`${query}&offset=${offset}`)
  }
}

interface IClearSearchedACAction extends IAction<"CLEAR_SEARCHED"> {}

export const clearSearchedActionCreator = (): IClearSearchedACAction => {
  return {
    type: CLEAR_SEARCHED,
    payload: undefined
  }
}

interface ISaveACAction extends IAction<"SAVE", IDataItem> {}

export const saveActionCreator = (item: IDataItem): ISaveACAction => {
  const request = window.indexedDB.open("SavedItems")

  request.onsuccess = () => {
    const db = request.result
    const transaction = db.transaction(["gifs", "stickers"], "readwrite")
    const gifStore = transaction.objectStore("gifs")
    const stickerStore = transaction.objectStore("stickers")

    if (!item.isSticker) {
      gifStore.add(item)
    } else {
      stickerStore.add(item)
    }

    transaction.oncomplete = () => {
      db.close()
    }
  }
  return {
    type: SAVE,
    payload: item
  }
}

interface IRemoveACAction
  extends IAction<"REMOVE", { id: string; isSticker: boolean }> {}

export const removeActionCreator = (item: IDataItem): IRemoveACAction => {
  const request = window.indexedDB.open("SavedItems")
  request.onsuccess = () => {
    const db = request.result
    const transaction = db.transaction(["gifs", "stickers"], "readwrite")
    const gifStore = transaction.objectStore("gifs")
    const stickerStore = transaction.objectStore("stickers")

    if (!item.isSticker) {
      gifStore.delete(item.id)
    } else {
      stickerStore.delete(item.id)
    }

    transaction.oncomplete = () => {
      db.close()
    }
  }
  return {
    type: REMOVE,
    payload: {
      id: item.id,
      isSticker: item.isSticker
    }
  }
}

interface ISetViewGifsACAction extends IAction<"SET_VIEW_GIFS"> {}

export const setViewGifsActionCreator = (): ISetViewGifsACAction => {
  return {
    type: SET_VIEW_GIFS,
    payload: undefined
  }
}

interface ISetViewStickersACAction extends IAction<"SET_VIEW_STICKERS"> {}

export const setViewStickersActionCreator = (): ISetViewStickersACAction => {
  return {
    type: SET_VIEW_STICKERS,
    payload: undefined
  }
}

interface ILoadACAction
  extends IAction<
    "LOAD",
    { gifsArray: IDataItem[]; stickersArray: IDataItem[] }
  > {}

export const loadActionCreator = ({
  gifsArray,
  stickersArray
}: {
  gifsArray: IDataItem[]
  stickersArray: IDataItem[]
}): ILoadACAction => {
  return {
    type: LOAD,
    payload: {
      gifsArray,
      stickersArray
    }
  }
}

export type Actions =
  | ITrendingGifsACAction
  | ITrendingStickersACAction
  | ISearchedGifsACAction
  | ISearchedStickersACAction
  | IClearSearchedACAction
  | ISaveACAction
  | IRemoveACAction
  | ISetViewGifsACAction
  | ISetViewStickersACAction
  | ILoadACAction
