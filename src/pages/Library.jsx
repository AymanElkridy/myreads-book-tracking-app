import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAll } from '../BooksAPI'
import BookShelf from '../components/BookShelf'
import Navbar from '../components/Navbar'

const Library = ({
  libraryBooks,
  setLibraryBooks,
  reloader,
  reloadShelves,
}) => {
  document.title = 'MyReads - My Library'

  const [booksLoaded, setBooksLoaded] = useState(false)

  useEffect(() => {
    const getBooks = async () => {
      const books = await getAll()
      setLibraryBooks(books)
    }
    getBooks()
  }, [reloader, setLibraryBooks])

  useEffect(() => {
    libraryBooks.length && setBooksLoaded(true)
  }, [libraryBooks])

  return (
    <Container>
      <Navbar currentPage="library" />
      {booksLoaded ? (
        <Wrapper>
          <BookShelf
            books={libraryBooks.filter(
              (book) => book.shelf === 'currentlyReading'
            )}
            title="Currently Reading"
            reloadShelves={reloadShelves}
          />
          <BookShelf
            books={libraryBooks.filter((book) => book.shelf === 'wantToRead')}
            title="Want To Read"
            reloadShelves={reloadShelves}
          />
          <BookShelf
            books={libraryBooks.filter((book) => book.shelf === 'read')}
            title="Read Already"
            reloadShelves={reloadShelves}
          />
        </Wrapper>
      ) : (
        <div className="loader-container">
          <img
            src="https://cdn.dribbble.com/users/411641/screenshots/4405331/media/1b59c76446403889df4947b5c028680c.gif"
            alt="loading"
          />
        </div>
      )}
    </Container>
  )
}

const Container = styled.div`
  min-height: 92vh;
  padding-bottom: 64px;
  & .loader-container {
    display: flex;
    justify-content: center;
    margin-top: 64px;
    & img {
      object-fit: contain;
      height: 450px;
    }
  }
`

const Wrapper = styled.div`
  padding-top: 32px;
`

export default Library
