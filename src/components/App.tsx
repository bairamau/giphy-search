import "../../public/semantic.cyborg.min.css"
import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"

import Loading from "./Loading"
import Menu from "./Menu"

import Loadable from "react-loadable"

const LoadableTrending = Loadable({
  loader: () => import(/* webpackChunkName: "trending" */"./Trending"),
  loading: Loading,
  timeout: 5000,
  delay: 300
})

const LoadableSaved = Loadable({
  loader: () => import(/* webpackChunkName: "saved" */ "./Saved"),
  loading: Loading,
  timeout: 5000,
  delay: 300
})

const LoadableSearch = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ "./Search"),
  loading: Loading,
  timeout: 5000,
  delay: 300
})

const App = () => {
  return (
    <Router>
      <Menu />
      xd
      <Container>
        <Switch>
          <Route path="/" exact component={LoadableTrending} />
          <Route path="/saved" exact component={LoadableSaved} />
          <Route path="/search/:words" exact component={LoadableSearch} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
