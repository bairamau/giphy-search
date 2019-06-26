import * as React from "react"
import { GET_TRENDING_GIFS, GET_SEARCHED_GIFS, Actions } from "./actions"

import { IDataItem } from "./api"

interface IState {
  trendingGifs: IDataItem[]
  gifs: IDataItem[]
  stickers: IDataItem[]
}

interface IReducer<TActions> {
  (state: IState, action: TActions): IState
}

interface IValue {
  state: IState
  dispatch: React.Dispatch<Actions>
}

const reducer: IReducer<Actions> = (state, action) => {
  switch (action.type) {
    case GET_TRENDING_GIFS:
      console.log(action.payload)
      return {
        ...state,
        trendingGifs: action.payload
      }
    case GET_SEARCHED_GIFS:
      console.log(action.payload)
      return {
        ...state,
        gifs: action.payload
      }
    default:
      return state
  }
}

const Context = React.createContext<IValue>({} as IValue)

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    trendingGifs: [],
    gifs: [],
    stickers: []
  })

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Context
