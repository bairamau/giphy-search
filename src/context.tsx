import * as React from "react"

import { Actions } from "./actions"
import { IState, reducer } from "./reducers"

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

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Context
