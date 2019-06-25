import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "./context"

import App from "./components/App"

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
)
