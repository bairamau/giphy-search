import * as React from "react"
import { IDataItem } from "../api"
import { Icon } from "semantic-ui-react"
import "./GridItem.css"

interface IGridItem extends IDataItem {
  saved: boolean
  handleClick(): void
}

const GridItem = ({
  id,
  title,
  url,
  saved,
  handleClick,
  isSticker
}: IGridItem) => {
  return (
    <div className="grid-item__container">
      {isSticker ? (
        <img src={url} id={id} alt={title} className="grid-item__image" />
      ) : (
        <video
          id={id}
          title={title}
          className="grid-item__image"
          src={url}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      <div className="grid-item__controls">
        <Icon
          inverted
          className="grid-item__button"
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
