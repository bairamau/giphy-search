import * as React from "react"
import Context from "../context"
import {
  getTrendingGifsActionCreator,
  getTrendingStickersActionCreator
} from "../actions"
import Grid from "./Grid"

const Search = () => {
  const { state, dispatch } = React.useContext(Context)

  const scrollHandler = () => {
    if (
      (window.innerHeight + window.pageYOffset) / document.body.scrollHeight >
      0.9
    ) {
      window.removeEventListener("scroll", scrollHandler)
      state.isViewingGifs
        ? getTrendingGifsActionCreator(state.trendingGifs.length)
            .then(action => dispatch(action))
            .then(() =>
              console.log(
                "dispatched trending gifs with offset",
                state.trendingGifs.length
              )
            )
        : getTrendingStickersActionCreator(state.trendingStickers.length)
            .then(action => dispatch(action))
            .then(() =>
              console.log(
                "dispatched trending stickers with offset",
                state.trendingStickers.length
              )
            )
    }
  }
  React.useEffect(() => {
    state.isViewingGifs
      ? state.trendingGifs.length === 0 &&
        getTrendingGifsActionCreator(0)
          .then(action => dispatch(action))
          .then(() => console.log("FIRST TIME dispatched trending gifs"))
      : state.trendingStickers.length === 0 &&
        getTrendingStickersActionCreator(0)
          .then(action => dispatch(action))
          .then(() => console.log("FIRST TIME dispatched trending stickers"))
  }, [state.isViewingGifs])

  React.useEffect(() => {
    window.addEventListener("scroll", scrollHandler)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
      console.log("removed scroll listener")
    }
  }, [
    state.trendingGifs.length,
    state.trendingStickers.length,
    state.isViewingGifs
  ])

  return (
    <Grid
      items={state.isViewingGifs ? state.trendingGifs : state.trendingStickers}
    />
  )
}

export default Search
