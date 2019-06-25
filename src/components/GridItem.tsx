import * as React from "react"
import { IDataItem } from "../api"

const GridItem = ({ id, title, url }: IDataItem) => {
  return <img style={{margin: "10px"}} height={200} src={url} id={id} alt={title} />
}

export default GridItem
