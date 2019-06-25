import "../../public/semantic.cyborg.min.css"
import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container } from "semantic-ui-react"

import Trending from "./Trending"
import Menu from "./Menu"

const App = () => {
  return (
    <Router>
      <Menu />
      <Switch>
        <Container>
          <Route path="/" component={Trending} />
        </Container>
      </Switch>
    </Router>
  )
}

export default App
