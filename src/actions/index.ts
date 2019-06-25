import { getTrendingGifs } from "../api"

export const GET_TRENDING_GIFS = "GET_TRENDING_GIFS"

export const getTrendingGifsAction = async () => {
  return {
    type: GET_TRENDING_GIFS,
    payload: {
      trendingGifs: await getTrendingGifs()
    }
  }
}
