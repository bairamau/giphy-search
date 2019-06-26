import * as React from "react"
import Context from "../context"
import { getTrendingGifsActionCreator } from "../actions"
import Grid from "./Grid"

const Search = () => {
  const { state, dispatch } = React.useContext(Context)
  React.useEffect(() => {
    getTrendingGifsActionCreator()
      .then(action => dispatch(action))
      .then(() => console.log("dispatched trending"))
  }, [])
  return <Grid items={state.trendingGifs} />
}

export default Search
