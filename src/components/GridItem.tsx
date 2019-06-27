import * as React from "react"
import { IDataItem } from "../api"
import { Icon } from "semantic-ui-react"
import "./GridItem.css"

interface IGridItem extends IDataItem {
  saved: boolean
  handleClick(): void
}

const GridItem = ({ id, title, url, saved, handleClick }: IGridItem) => {
  return (
    <div className="GridItem__container">
      <img src={url} alt={title} id={id} className="GridItem__image" />
      <div className="GridItem__controls">
        <Icon inverted className="GridItem__button"
          color={saved ? "pink" : "grey"}
          onClick={handleClick}
          name="like"
          size="massive"
        />
      </div>
    </div>
  )
}

export default GridItem
