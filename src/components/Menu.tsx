import * as React from "react"
import {
  NavLink,
  Link,
  RouteComponentProps,
  withRouter
} from "react-router-dom"
import {
  Menu,
  Container,
  Segment,
  Search,
  Input,
  Form,
  Icon
} from "semantic-ui-react"

const HeaderMenu = (props: RouteComponentProps) => {
  const [search, setSearch] = React.useState("")
  const handleSearch = () => {
    props.history.push(`/search/${search.split(" ").join("-")}`)
  }

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
            <Input transparent icon placeholder="Search...">
              <input
                onChange={e => setSearch(e.target.value)}
                value={search}
                onKeyPress={e => (e.key === "Enter" ? handleSearch() : null)}
              />
              <Icon onClick={handleSearch} name="search" link={true} />
            </Input>
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  )
}

export default withRouter(HeaderMenu)
