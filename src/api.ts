const BASE_URL = "http://api.giphy.com/v1"
const API_KEY = "PexJfFl286Iof51NBHygoum77qjxOTbm"

export interface IDataItem {
  isSticker: boolean
  id: string
  title: string
  url: string
}

const mapData = (
  data: {
    is_sticker: boolean
    id: string
    title: string
    url: string
    images: { original: { mp4: string; webp: string } }
  }[]
): IDataItem[] =>
  data.map(item => ({
    isSticker: item.is_sticker,
    id: item.id,
    title: item.title,
    url: item.is_sticker ? item.images.original.webp : item.images.original.mp4
  }))

const getData = async (path: string, query: string = "") => {
  return await fetch(`${BASE_URL}/${path}?api_key=${API_KEY}${query}`)
    .then(response => response.json())
    .then(object => mapData(object.data))
}

export const getSearchedGifs = async (query: string) =>
  await getData("gifs/search", query)

export const getSearchedStickers = async (query: string) =>
  await getData("stickers/search", query)

export const getTrendingGifs = async (query: string) =>
  await getData("gifs/trending", query)

export const getTrendingStickers = async (query: string) =>
  await getData("stickers/trending", query)
