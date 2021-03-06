import * as React from "react"
import { IDataItem } from "../api"
import GridItem from "./GridItem"
import Context from "../context"
import { saveActionCreator, removeActionCreator } from "../actions"
import "./Grid.css"

interface IGridProps {
  items: IDataItem[]
}

const Grid = (props: IGridProps) => {
  const { state, dispatch } = React.useContext(Context)

  return (
    <div className="grid-container">
      {props.items.map(item => {
        return !item.isSticker ? (
          <GridItem
            {...item}
            saved={state.savedGifs.hasOwnProperty(item.id)}
            handleClick={
              state.savedGifs[item.id]
                ? () => dispatch(removeActionCreator(item))
                : () => dispatch(saveActionCreator(item))
            }
            key={item.id}
          />
        ) : (
          <GridItem
            {...item}
            saved={state.savedStickers.hasOwnProperty(item.id)}
            handleClick={
              state.savedStickers[item.id]
                ? () => dispatch(removeActionCreator(item))
                : () => dispatch(saveActionCreator(item))
            }
            key={item.id}
          />
        )
      })}
    </div>
  )
}

export default Grid
