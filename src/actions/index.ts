import {
  getTrendingGifs,
  getTrendingStickers,
  getSearchedGifs,
  getSearchedStickers,
  IDataItem
} from "../api"

export const GET_TRENDING_GIFS = "GET_TRENDING_GIFS"
export const GET_TRENDING_STICKERS = "GET_TRENDING_STICKERS"
export const GET_SEARCHED_GIFS = "GET_SEARCHED_GIFS"
export const GET_SEARCHED_STICKERS = "GET_SEARCHED_STICKERS"
export const SAVE = "SAVE"
export const REMOVE = "REMOVE"
export const SET_VIEW_GIFS = "SET_VIEW_GIFS"
export const SET_VIEW_STICKERS = "SET_VIEW_STICKERS"

interface IAction<TType, TPayload = undefined> {
  type: TType
  payload: TPayload
}

interface ITrendingGifsACAction
  extends IAction<"GET_TRENDING_GIFS", IDataItem[]> {}

export const getTrendingGifsActionCreator = async (): Promise<
  ITrendingGifsACAction
> => {
  return {
    type: GET_TRENDING_GIFS,
    payload: await getTrendingGifs()
  }
}

interface ITrendingStickersACAction
  extends IAction<"GET_TRENDING_STICKERS", IDataItem[]> {}

export const getTrendingStickersActionCreator = async (): Promise<
  ITrendingStickersACAction
> => {
  return {
    type: GET_TRENDING_STICKERS,
    payload: await getTrendingStickers()
  }
}

interface ISearchedGifsACAction
  extends IAction<"GET_SEARCHED_GIFS", IDataItem[]> {}

export const getSearchedGifsActionCreator = async (
  query: string
): Promise<ISearchedGifsACAction> => {
  return {
    type: GET_SEARCHED_GIFS,
    payload: await getSearchedGifs(query)
  }
}

interface ISearchedStickersACAction
  extends IAction<"GET_SEARCHED_STICKERS", IDataItem[]> {}

export const getSearchedStickersActionCreator = async (
  query: string
): Promise<ISearchedStickersACAction> => {
  return {
    type: GET_SEARCHED_STICKERS,
    payload: await getSearchedStickers(query)
  }
}

interface ISaveACAction extends IAction<"SAVE", IDataItem> {}

export const saveActionCreator = (item: IDataItem): ISaveACAction => {
  return {
    type: SAVE,
    payload: item
  }
}

interface IRemoveACAction
  extends IAction<"REMOVE", { id: string; isSticker: boolean }> {}

export const removeActionCreator = (item: IDataItem): IRemoveACAction => {
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

export type Actions =
  | ITrendingGifsACAction
  | ITrendingStickersACAction
  | ISearchedGifsACAction
  | ISearchedStickersACAction
  | ISaveACAction
  | IRemoveACAction
  | ISetViewGifsACAction
  | ISetViewStickersACAction
