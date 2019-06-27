import * as React from "react"
import { Redirect } from "react-router-dom"
import Context from "../context"
import Grid from "./Grid"

const Search = () => {
  const { state } = React.useContext(Context)

  return Object.keys(state.savedGifs).length === 0 &&
    Object.keys(state.savedStickers).length === 0 ? (
    <Redirect to="/" />
  ) : (
    <Grid
      items={Object.values(
        state.isViewingGifs ? state.savedGifs : state.savedStickers
      )}
    />
  )
}

export default Search
