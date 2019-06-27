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

  const scrollHandler = () => {
    if (
      (window.innerHeight + window.pageYOffset) / document.body.scrollHeight >
      0.9
    ) {
      window.removeEventListener("scroll", scrollHandler)
      state.isViewingGifs
        ? getSearchedGifsActionCreator(queryString, state.gifs.length)
            .then(action => dispatch(action))
            .then(() =>
              console.log(
                "dispatched search gifs with offset",
                state.gifs.length
              )
            )
        : getSearchedStickersActionCreator(queryString, state.stickers.length)
            .then(action => dispatch(action))
            .then(() =>
              console.log(
                "dispatched search stickers with offset",
                state.stickers.length
              )
            )
    }
  }

  React.useEffect(() => {
    state.isViewingGifs
      ? state.gifs.length === 0 &&
        getSearchedGifsActionCreator(queryString, 0)
          .then(action => dispatch(action))
          .then(() => console.log("FIRST TIME dispatched search gifs"))
      : state.stickers.length === 0 &&
        getSearchedStickersActionCreator(queryString, 0)
          .then(action => dispatch(action))
          .then(() => console.log("FIRST TIME dispatched search stickers"))
  }, [queryString, state.isViewingGifs])

  React.useEffect(() => {
    if (
      (state.isViewingGifs && state.gifs.length !== 0) ||
      (!state.isViewingGifs && state.stickers.length !== 0)
    ) {
      window.addEventListener("scroll", scrollHandler)
      console.log("added scroll listener")
      return () => {
        window.removeEventListener("scroll", scrollHandler)
        console.log("removed scroll listener")
      }
    }
  }, [state.isViewingGifs, state.gifs.length, state.stickers.length])

  React.useEffect(() => {})
  return <Grid items={state.isViewingGifs ? state.gifs : state.stickers} />
}

export default Search
