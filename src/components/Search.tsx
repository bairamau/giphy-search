import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import Context from "../context"
import {
  getSearchedGifsActionCreator,
  getSearchedStickersActionCreator
} from "../actions"
import Grid from "./Grid"

interface IMatchParams {
  words: string
}

const Search = (props: RouteComponentProps<IMatchParams>) => {
  const queryString = `&q=${props.match.params.words.split("-").join(" ")}`
  const { state, dispatch } = React.useContext(Context)
  React.useEffect(() => {
    state.isViewingGifs
      ? getSearchedGifsActionCreator(queryString)
          .then(action => dispatch(action))
          .then(() => console.log("dispatched search gifs"))
      : getSearchedStickersActionCreator(queryString)
          .then(action => dispatch(action))
          .then(() => console.log("dispatched search stickers"))
  }, [queryString, state.isViewingGifs])
  return <Grid items={state.isViewingGifs ? state.gifs : state.stickers} />
}

export default Search
