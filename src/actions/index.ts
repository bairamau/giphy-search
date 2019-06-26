import { getTrendingGifs, getSearchedGifs, IDataItem } from "../api"

export const GET_TRENDING_GIFS = "GET_TRENDING_GIFS"
export const GET_SEARCHED_GIFS = "GET_SEARCHED_GIFS"

interface IAction<TType, TPayload> {
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

export type Actions = ITrendingGifsACAction | ISearchedGifsACAction
