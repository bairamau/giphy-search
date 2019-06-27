import * as React from "react"
import Context from "../context"
import {
  getTrendingGifsActionCreator,
  getTrendingStickersActionCreator
} from "../actions"
import Grid from "./Grid"

const Search = () => {
  const { state, dispatch } = React.useContext(Context)

  React.useEffect(() => {
    state.isViewingGifs
      ? getTrendingGifsActionCreator()
          .then(action => dispatch(action))
          .then(() => console.log("dispatched trending"))
      : getTrendingStickersActionCreator()
          .then(action => dispatch(action))
          .then(() => console.log("dispatched trending"))
  }, [state.isViewingGifs])
  return (
    <Grid
      items={state.isViewingGifs ? state.trendingGifs : state.trendingStickers}
    />
  )
}

export default Search
