import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import Context from "../context"
import {
  getSearchedGifsActionCreator,
  getSearchedStickersActionCreator,
  clearSearchedActionCreator
} from "../actions"
import Grid from "./Grid"

interface IMatchParams {
  words: string
}

const Search = (props: RouteComponentProps<IMatchParams>) => {
  const queryString = `&q=${props.match.params.words.split("-").join(" ")}`
  const { state, dispatch } = React.useContext(Context)

  const scrollHandler = () => {
    if (
      (window.innerHeight + window.pageYOffset) / document.body.scrollHeight >
      0.9
    ) {
      window.removeEventListener("scroll", scrollHandler)
      state.isViewingGifs
        ? getSearchedGifsActionCreator(queryString, state.gifs.length).then(
            action => dispatch(action)
          )
        : getSearchedStickersActionCreator(
            queryString,
            state.stickers.length
          ).then(action => dispatch(action))
    }
  }

  React.useEffect(() => {
    dispatch(clearSearchedActionCreator())
  }, [queryString])

  React.useEffect(() => {
    state.isViewingGifs
      ? state.gifs.length === 0 &&
        getSearchedGifsActionCreator(queryString, 0).then(action =>
          dispatch(action)
        )
      : state.stickers.length === 0 &&
        getSearchedStickersActionCreator(queryString, 0).then(action =>
          dispatch(action)
        )
    if (
      (state.isViewingGifs && state.gifs.length !== 0) ||
      (!state.isViewingGifs && state.stickers.length !== 0)
    ) {
      window.addEventListener("scroll", scrollHandler)
      return () => {
        window.removeEventListener("scroll", scrollHandler)
      }
    }
  }, [state.isViewingGifs, state.gifs.length, state.stickers.length])

  return <Grid items={state.isViewingGifs ? state.gifs : state.stickers} />
}

export default Search
