import * as React from "react"
import { getTrendingGifsAction, GET_TRENDING_GIFS } from "./actions"

interface IAction {
  type: string
  payload?: any
}

interface IState {
  loading: boolean
  trendingGifs: []
  gifs: []
  stickers: []
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
        loading: false,
        trendingGifs: action.payload.trendingGifs
      }
    default:
      return {
        ...state,
        gifs: [],
        stickers: []
      }
  }
}

interface IValue {
  state: IState
  dispatch: React.Dispatch<IAction>
}

const Context = React.createContext<IValue>({} as IValue)

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<IReducer>(reducer, {
    loading: true,
    trendingGifs: [],
    gifs: [],
    stickers: []
  })

  React.useEffect(() => {
    getTrendingGifsAction().then(action => dispatch(action))
  }, [])

  React.useEffect(() => console.log("rendered"))

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export default Context
