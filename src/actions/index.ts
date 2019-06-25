import { getTrendingGifs, getSearchedGifs } from "../api"

export const GET_TRENDING_GIFS = "GET_TRENDING_GIFS"
export const GET_SEARCHED_GIFS = "GET_SEARCHED_GIFS"

export const getTrendingGifsAction = async () => {
  return {
    type: GET_TRENDING_GIFS,
    payload: {
      trendingGifs: await getTrendingGifs()
    }
  }
}

export const getSearchedGifsAction = async (query: string) => {
  return {
    type: GET_SEARCHED_GIFS,
    payload: {
      gifs: await getSearchedGifs(query)
    }
  }
}
