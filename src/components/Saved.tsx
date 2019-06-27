import * as React from "react"
import Context from "../context"
import Grid from "./Grid"

const Search = () => {
  const { state } = React.useContext(Context)

  return (
    <Grid
      items={Object.values(
        state.isViewingGifs ? state.savedGifs : state.savedStickers
      )}
    />
  )
}

export default Search
