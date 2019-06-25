const BASE_URL = "http://api.giphy.com/v1"
const API_KEY = "PexJfFl286Iof51NBHygoum77qjxOTbm"

export interface IDataItem {
  type: string
  id: string
  title: string
  url: string
}

const mapData = (data: any): IDataItem[] =>
  data.map((item: any) => ({
    type: item.type,
    id: item.id,
    title: item.title,
    url: item.images.original.webp
  }))

const getData = async (path: string, query: string = "") => {
  return await fetch(`${BASE_URL}/${path}?api_key=${API_KEY}${query}`)
    .then(response => response.json())
    .then(object => mapData(object.data))
}

export const getTrendingGifs = async () => {
  return await getData("gifs/trending")
}
