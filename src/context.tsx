import * as React from "react"

import { Actions, loadActionCreator } from "./actions"
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

  React.useEffect(() => {
    loadActionCreator().then(action => dispatch(action))
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Context
