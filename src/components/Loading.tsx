import * as React from "react"
import { Loader } from "semantic-ui-react"
import { LoadingComponentProps } from "react-loadable"

const Loading: React.FC<LoadingComponentProps> = () => (
  <Loader size="massive" content="Loading" />
)

export default Loading