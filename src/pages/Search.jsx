import { useEffect, useState } from "react"
import styled from "styled-components"
import { search } from "../BooksAPI"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import SearchResults from "../components/SearchResults"

const Search = ({ libraryBooks, reloadShelves }) => {
  document.title = 'MyReads - Search'

  const [searchBooks, setSearchBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const getBooks = async () => {
      const books = await search(searchQuery, 5)
      books && setSearchBooks(books)
    }
    searchQuery.length < 2 && setSearchBooks([])
    searchQuery.length > 1 && getBooks()
  }, [searchQuery])

  return (
    <Container>
      <Navbar currentPage='search'/>
      <SearchBar query={searchQuery} setQuery={setSearchQuery}/>
      <SearchResults books={searchBooks} library={libraryBooks} reloadShelves={reloadShelves}/>
    </Container>
  )
}

const Container = styled.div`
  min-height: 101vh;
`

export default Search