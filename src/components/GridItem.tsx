import * as React from "react"
import { IDataItem } from "../api"

const GridItem = ({ id, title, url }: IDataItem) => {
  return <img style={{width:"100%", margin: "10px 0" }} src={url} id={id} alt={title} />
}

export default GridItem
