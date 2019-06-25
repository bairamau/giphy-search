import * as React from "react"
import Context from "../context"
import Grid from "./Grid"

const Trending = () => {
  const { state } = React.useContext(Context)
  return <Grid items={state.trendingGifs} />
}

export default Trending
