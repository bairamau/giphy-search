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
        columns: "4 auto",
        columnGap: "20px"
      }}
    >
      {props.items.map(item => (
        <GridItem {...item} key={item.id} />
      ))}
    </div>
  )
}

export default Grid
