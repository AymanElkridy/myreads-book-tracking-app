import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react"
import { getAll } from "./BooksAPI"
import Library from "./pages/Library";
import Search from "./pages/Search";
import Book from "./pages/Book";

const App = () => {
  const [libraryBooks, setLibraryBooks] = useState([])
  const [reloader, setReloader] = useState(true)

  const reloadShelves = () => {
    setReloader(!reloader)
  }

  useEffect(() => {
    const getBooks = async () => {
      const books = await getAll()
      setLibraryBooks(books)
    }
    getBooks()
  },[reloader])
  
  return (
    <Routes>
      <Route path="/" element={<Library  libraryBooks={libraryBooks} setLibraryBooks={setLibraryBooks} reloadShelves={reloadShelves}/>} />
      <Route path="/search" element={<Search libraryBooks={libraryBooks} reloadShelves={reloadShelves}/>} />
      <Route path="/book/:bookId" element={<Book libraryBooks={libraryBooks} reloadShelves={reloadShelves}/>} />
    </Routes>
  );
}

export default App;
