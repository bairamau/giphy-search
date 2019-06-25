import * as React from "react"
import { NavLink } from "react-router-dom"
import { Menu, Container, Input, Segment } from "semantic-ui-react"

const HeaderMenu = () => {
  return (
    <Segment size="massive">
      <Menu inverted fixed="top" size="massive" color="black">
        <Container>
          <Menu.Item as={NavLink} exact to="/">
            Trending
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/saved">
            Saved
          </Menu.Item>
          <Menu.Item style={{ flex: "1" }}>
            <Input transparent icon={{ name: "search" }} placeholder="Search..."/>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  )
}

export default HeaderMenu
