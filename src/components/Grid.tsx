import * as React from "react"
import { IDataItem } from "../api"
import GridItem from "./GridItem"
import Context from "../context"
import { saveActionCreator, removeActionCreator } from "../actions"

interface IGridProps {
  items: IDataItem[]
}

const Grid = (props: IGridProps) => {
  const { state, dispatch } = React.useContext(Context)

  return (
    <div
      style={{
        columns: "4 auto",
        columnGap: "20px",
        marginTop: "20px"
      }}
    >
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
