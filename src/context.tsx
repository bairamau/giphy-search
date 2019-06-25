import * as React from "react"
import {
  getTrendingGifsAction,
  GET_TRENDING_GIFS,
  GET_SEARCHED_GIFS
} from "./actions"

import { IDataItem } from "./api"

interface IAction {
  type: string
  payload?: any
}

interface IState {
  trendingGifs: IDataItem[]
  gifs: IDataItem[]
  stickers: IDataItem[]
}

interface IReducer {
  (state: IState, action: IAction): IState
}

const reducer: IReducer = (state, action) => {
  switch (action.type) {
    case GET_TRENDING_GIFS:
      console.log(action.payload.trendingGifs)
      return {
        ...state,
        trendingGifs: action.payload.trendingGifs
      }
    case GET_SEARCHED_GIFS:
      console.log(action.payload.gifs)
      return {
        ...state,
        gifs: action.payload.gifs
      }
    default:
      return state
  }
}

interface IValue {
  state: IState
  dispatch: React.Dispatch<IAction>
}

const Context = React.createContext<IValue>({} as IValue)

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<IReducer>(reducer, {
    trendingGifs: [],
    gifs: [],
    stickers: []
  })

  React.useEffect(() => {
    getTrendingGifsAction().then(action => dispatch(action))
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Context
