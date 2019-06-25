import "../../public/semantic.cyborg.min.css"
import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { Container } from "semantic-ui-react"

import Trending from "./Trending"
import Search from "./Search"
import Menu from "./Menu"

const App = () => {
  return (
    <Router>
      <Menu />
      <Container>
        <Switch>
          <Route path="/" exact component={Trending} />
          <Route path="/search/:words" exact component={Search} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App
