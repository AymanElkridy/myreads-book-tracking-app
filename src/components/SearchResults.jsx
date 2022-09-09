import styled from "styled-components"
import BookCard from "./BookCard"

const SearchResults = ({ books, library, reloadShelves }) => {
  return (
    <Container>
      <Wrapper>
        {books.length ? (
          <Wrapper>
            {books.map(book => <BookCard
              key={book.id}
              shelf={library.filter(lb => lb.id === book.id).length ? library.filter(lb => lb.id === book.id)[0].shelf : 'none'}
              page={library.filter(lb => lb.id === book.id).length ? 'library' : 'search'}
              title={book.title}
              authors={book.authors}
              thumbnail={book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/160x200'}
              bookId={book.id}
              reloadShelves={reloadShelves}/>)}
          </Wrapper>
        ) : (
          <Wrapper>
            <h2>No Search Results</h2>
          </Wrapper>
        )}
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & hr {
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
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 32px 64px;
`

export default SearchResults