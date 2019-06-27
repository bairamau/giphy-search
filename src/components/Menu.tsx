import * as React from "react"
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom"
import { Menu, Container, Segment, Input, Icon } from "semantic-ui-react"

import Context from "../context"
import {
  setViewGifsActionCreator,
  setViewStickersActionCreator
} from "../actions"

const HeaderMenu = (props: RouteComponentProps) => {
  const [search, setSearch] = React.useState("")
  const { state, dispatch } = React.useContext(Context)
  const searchRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  })
  const handleSearch = () => {
    props.history.push(`/search/${search.split(" ").join("-")}`)
  }

  return (
    <React.Fragment>
      <Segment size="massive">
        <Menu inverted fixed="top" size="massive" color="black">
          <Container>
            <Menu.Item as={NavLink} exact to="/">
              Trending
            </Menu.Item>
            {(Object.keys(state.savedGifs).length !== 0 ||
              Object.keys(state.savedStickers).length !== 0) && (
              <Menu.Item as={NavLink} exact to="/saved">
                Saved
              </Menu.Item>
            )}
            <Menu.Item style={{ flex: "1" }}>
              <Input transparent icon placeholder="Search...">
                <input
                  ref={searchRef}
                  autoFocus={true}
                  onChange={e => setSearch(e.target.value)}
                  onKeyPress={e => (e.key === "Enter" ? handleSearch() : null)}
                />
                <Icon onClick={handleSearch} name="search" link={true} />
              </Input>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <Container>
        <Menu compact inverted size="tiny">
          <Menu.Item
            onClick={
              !state.isViewingGifs
                ? () => dispatch(setViewGifsActionCreator())
                : () => null
            }
            active={state.isViewingGifs}
            color="pink"
          >
            Gifs
          </Menu.Item>
          <Menu.Item
            onClick={
              state.isViewingGifs
                ? () => dispatch(setViewStickersActionCreator())
                : () => null
            }
            active={!state.isViewingGifs}
            color="pink"
          >
            Stickers
          </Menu.Item>
        </Menu>
      </Container>
    </React.Fragment>
  )
}

export default withRouter(HeaderMenu)
