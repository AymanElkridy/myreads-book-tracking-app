import { useEffect, useState } from 'react'
import { get } from '../BooksAPI'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import BookDetails from '../components/BookDetails'

const Book = ({ libraryBooks, reloadShelves }) => {
  const [bookLoaded, setBookLoaded] = useState(false)
  const [bookDetails, setBookDetails] = useState({})

  const { bookId } = useParams()

  useEffect(() => {
    const getBook = async (id) => {
      const book = await get(id)
      setBookDetails(book)
    }
    getBook(bookId)
  }, [bookId])

  useEffect(() => {
    bookDetails.title && setBookLoaded(true)
    document.title = bookDetails.title
      ? 'MyReads - "' + bookDetails.title
      : 'MyReads'
    document.title += bookDetails.authors
      ? '" by ' +
        bookDetails.authors.reduce(
          (str, author, i, arr) =>
            (str += i === arr.length - 1 ? author : `${author}, `),
          ''
        )
      : ''
  }, [bookDetails])

  return (
    <Container>
      <Navbar currentPage="book" />
      {bookLoaded ? (
        <BookDetails
          book={bookDetails}
          library={libraryBooks}
          reloadShelves={reloadShelves}
        />
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

export default Book
