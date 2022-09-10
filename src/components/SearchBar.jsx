import styled from 'styled-components'

const SearchBar = ({ query, setQuery }) => {
  return (
    <Container>
      <Wrapper>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books ..."
          autoFocus
        />
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  height: 48px;
  display: flex;
  justify-content: center;
  border-bottom: 2px #ccc solid;
`

const Wrapper = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 1200px;
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
  }
`

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  outline: none;
  border: none;
  font-size: 24px;
  color: #999;
  &::placeholder {
    color: #ccc;
  }
`

export default SearchBar
