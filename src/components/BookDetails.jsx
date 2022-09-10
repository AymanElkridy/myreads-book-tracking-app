import styled from "styled-components"

const BookDetails = ({ book, library }) => {

  const SHELVES = [
    {shelf: 'currentlyReading', title: 'Reading'},
    {shelf: 'wantToRead', title: 'Want to Read'},
    {shelf: 'read', title: 'Read Already'},
    {shelf: 'none', title: 'None'}
  ]

  const bookShelf = library.filter(lb => lb.id === book.id).length ? library.filter(lb => lb.id === book.id)[0].shelf : 'none'
  const shelfTitle = SHELVES.filter(shelf => shelf.shelf === bookShelf)[0].title

  return (
    <Container>
      <Wrapper>
        <Left>
          <img className="book-cover" src={book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/160x200'} alt={book.title}/>
        </Left>
        <Right>
          {book.title && (
            <h1 className="book-title">{book.title}</h1>
          )}
          {book.authors && (
            <p><strong>Author(s):</strong> {book.authors.reduce((str, author, i, arr) => str += i === arr.length - 1 ? author : `${author}, `, '')}</p>
          )}
          {book.publishedDate && (
            <p><strong>Publishing Date:</strong> {book.publishedDate}</p>
          )}
          {book.description && (
            <div>
              <p className="desc"><strong>Description:</strong></p>
              <p className="desc">{book.description}</p>
            </div>
          )}
          {book.categories && (
            <p><strong>Categories:</strong> {book.categories.reduce((str, category, i, arr) => str += i === arr.length - 1 ? category : `${category}, `, '')}</p>
          )}
          {book.language && (
            <p><strong>Language:</strong> {book.language.toUpperCase()}</p>
          )}
          <p><strong>Shelf:</strong> {shelfTitle}</p>
        </Right>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 48px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
    flex-direction: column;
    & .book-cover {
      max-width: 200px;
    }
    & .book-title {
      text-align: center;
    }
  }
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .book-cover {
    padding-top: 24px;
    width: 50%;
    min-width: 160px;
  }
`

const Right = styled.div`
  flex: 2;
  height: 100%;
  & .desc {
    margin: 8px 0;
  }
`

export default BookDetails