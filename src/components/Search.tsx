import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import Context from "../context"
import { getSearchedGifsActionCreator } from "../actions"
import Grid from "./Grid"

interface IMatchParams {
  words: string
}

const Search = (props: RouteComponentProps<IMatchParams>) => {
  const queryString = `&q=${props.match.params.words.split("-").join(" ")}`
  const { state, dispatch } = React.useContext(Context)
  React.useEffect(() => {
    getSearchedGifsActionCreator(queryString)
      .then(action => dispatch(action))
      .then(() => console.log("dispatched search"))
  }, [queryString])
  return <Grid items={state.gifs} />
}

export default Search
