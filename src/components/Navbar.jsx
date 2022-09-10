import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = ({ currentPage }) => {
  return (
    <Container>
      <Wrapper currentPage={currentPage}>
        <Links>
          <LinkWrapper className="library">
            <Link to="/">
              <span>My Library</span>
              <span className="material-icons-outlined">book</span>
            </Link>
          </LinkWrapper>
          <LinkWrapper className="search">
            <Link to="/search">
              <span>Search</span>
              <span className="material-icons-outlined">search</span>
            </Link>
          </LinkWrapper>
        </Links>
        <Header>MyReads</Header>
        <FillerComponent />
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 72px;
  background-color: var(--main);
  color: var(--light);
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  & div.${(props) => props.currentPage} {
    border-bottom: 2px solid var(--light);
    padding-bottom: 6px;
    font-weight: 500;
  }
  & a {
    color: var(--light);
    text-decoration: none;
    & span.material-icons-outlined {
      display: none;
    }
  }
  @media screen and (max-width: 1240px) {
    width: 1080px;
  }
  @media screen and (max-width: 1120px) {
    width: 880px;
  }
  @media screen and (max-width: 920px) {
    width: 750px;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    & div a span {
      display: none;
    }
    & div a span.material-icons-outlined {
      display: inline;
      font-size: 1.75rem;
    }
  }
`

const Links = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const LinkWrapper = styled.div`
  padding: 8px 0;
  margin: 0 24px 0 8px;
  font-weight: 300;
  font-size: 20px;
  @media screen and (max-width: 768px) {
    margin: 0 12px;
  }
`

const Header = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 36px;
  font-family: 'Playfair Display', serif;
  letter-spacing: -1px;
  user-select: none;
  @media screen and (max-width: 768px) {
    text-align: right;
  }
`

const FillerComponent = styled.div`
  flex: 1;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export default Navbar
