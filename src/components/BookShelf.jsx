import styled from "styled-components"
import BookCard from "./BookCard"

const BookShelf = ({ title, books, reloadShelves }) => {
  return (
    <Container>
      <Title>
        {title}
      </Title>
      <hr />
      {books.length ? (
        <Wrapper>
          {books.map(book => <BookCard
            key={book.id}
            shelf={book.shelf ? book.shelf : 'none'}
            page='library'
            title={book.title}
            authors={book.authors}
            thumbnail={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'https://via.placeholder.com/160x200'}
            bookId={book.id}
            reloadShelves={reloadShelves}/>)}
        </Wrapper>
      ) : (
        <Wrapper>
          <h2>There are no books here</h2>
        </Wrapper>
      )}
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

const Title = styled.h1`
  margin-bottom: 0;
`

export default BookShelf