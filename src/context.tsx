import * as React from "react"

import { Actions, loadActionCreator } from "./actions"
import { IState, reducer } from "./reducers"
import { IDataItem } from "./api"

interface IValue {
  state: IState
  dispatch: React.Dispatch<Actions>
}

const Context = React.createContext<IValue>({} as IValue)

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    trendingGifs: [],
    trendingStickers: [],
    gifs: [],
    stickers: [],
    savedGifs: {},
    savedStickers: {},
    isViewingGifs: true
  })

  React.useEffect(() => {
    let gifsArray: IDataItem[] = []
    let stickersArray: IDataItem[] = []
    const request = window.indexedDB.open("SavedItems")

    request.onupgradeneeded = () => {
      const db = request.result

      const gifStore = db.createObjectStore("gifs", { keyPath: "id" })
      gifStore.createIndex("id", "id")

      const stickerStore = db.createObjectStore("stickers", { keyPath: "id" })
      stickerStore.createIndex("id", "id")
    }

    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(["gifs", "stickers"], "readwrite")
      const gifStore = transaction.objectStore("gifs")
      const stickerStore = transaction.objectStore("stickers")

      const gifsRequest = gifStore.getAll()
      const stickersRequest = stickerStore.getAll()
      gifsRequest.onsuccess = async () => {
        gifsArray = gifsRequest.result
      }
      stickersRequest.onsuccess = () => {
        stickersArray = stickersRequest.result
      }

      transaction.oncomplete = () => {
        db.close()
        dispatch(loadActionCreator({ gifsArray, stickersArray }))
      }
    }
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Context
