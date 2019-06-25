import * as React from "react"
import { IDataItem } from "../api"
import GridItem from "./GridItem"

interface IGridProps {
  items: IDataItem[]
}

const Grid = (props: IGridProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {props.items.map(item => (
        <GridItem {...item} key={item.id} />
      ))}
    </div>
  )
}

export default Grid
