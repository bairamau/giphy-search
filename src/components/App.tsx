import * as React from "react"
import "../../public/semantic.cyborg.min.css"
import { Header } from "semantic-ui-react"

export interface AppProps {
  compiler: string
  framework: string
}

export default class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <Header>
        Hello from {this.props.compiler} and {this.props.framework}!
      </Header>
    )
  }
}
