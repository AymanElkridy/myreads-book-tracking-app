import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { update } from "../BooksAPI"

const BookCard = ({ shelf, page, title, authors, thumbnail, bookId, reloadShelves}) => {

  const [buttonActive, setButtonActive] = useState(false)

  const handleAddClick = () => {
    const cancel = () => {
      setTimeout(() => {window.removeEventListener('click', cancel)}, 0)
      setButtonActive(false)
    }
    if (!buttonActive) {
      setTimeout(() => {window.addEventListener('click', cancel)}, 0)
      setButtonActive(true)
    } else {
      cancel()
    }
  }

  const changeShelves = async (id, shelf) => {
    await update(id, shelf)
    reloadShelves()
  }

  const SHELVES = [
    {shelf: 'currentlyReading', title: 'Reading', icon_text: 'pending', cases: ['library','search']},
    {shelf: 'wantToRead', title: 'Want to Read', icon_text: 'bookmark_add', cases: ['library','search']},
    {shelf: 'read', title: 'Read Already', icon_text: 'assignment_turned_in', cases: ['library','search']},
    {shelf: 'delete', title: 'Delete', icon_text: 'close', cases: ['library']},
    {shelf: 'none', title: 'None', icon_text: 'do_not_disturb', cases: ['search']},
  ]

  return (
    <Card>
      {page === 'search' ? (
          <AddButton id={`add-button-${bookId}`} onClick={handleAddClick} className={buttonActive && 'active'}>
            <span className="material-icons-outlined first">add</span>
            <span className="material-icons-outlined second">expand_more</span>
            <span className="add-button-text">Add to My Library</span>
          </AddButton>
        ) : (
          <AddButton id={`add-button-${bookId}`} onClick={handleAddClick} className={buttonActive && 'active'}>
            <span className="material-icons-outlined first">edit</span>
            <span className="material-icons-outlined second">expand_more</span>
            <span className="add-button-text">Change Shelves</span>
          </AddButton>
        )}
      <ShelvesList id={`shelves-list-${bookId}`} className={buttonActive && 'active'} shelf={shelf}>
        <ul>
          {SHELVES.filter(shelf => shelf.cases.includes(page)).map(shelf => {
            return (
              <li className={shelf.shelf} key={`${bookId}_shelf_${shelf.shelf}`} onClick={() => changeShelves(bookId, shelf.shelf)}>
                <span className="material-icons-outlined">
                  {shelf.icon_text}
                </span>
                {shelf.title}
                <span className={`material-icons-outlined shelf-check check-${shelf.shelf}`}>
                  check
                </span>
              </li>
            )
          })}
        </ul>
      </ShelvesList>
      <ImgContainer>
        <Link to={'/book/' + bookId}>
          <Img src={thumbnail} alt={title}/> 
        </Link>  
      </ImgContainer>
      <Text>
        <Link to={'/book/' + bookId}>
          <p className="title">{title}</p>
        </Link> 
        {authors && (
          <p className="name">{authors.reduce((str, author, i, arr) => str += i === arr.length - 1 ? author : `${author}, `, '')}</p>
        )}
      </Text>
    </Card>
  )
}

const Card = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 32px 32px;
  border-radius: 4px;
  position: relative;
`

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  background-color: #ffffffc0;
  position: absolute;
  top: 8px;
  left: 8px;
  & .material-icons-outlined {
    position: absolute;
    left: 4px;
    &.second {
      display: none;
    }
  }
  & .add-button-text {
    display: none;
    position: absolute;
    left: 30px;
    font-size: 14px;
    width: 112px;
    transition: .5s;
  }
  transition: .35s;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: var(--light);
    box-shadow: 2px 2px 5px #00000080;
    width: 144px;
    & .first {
      display: none;
    }
    & .second {
      display: inline;
    }
    & .add-button-text {
      display: inline;
    }
  }
  &.active {
    border-radius: 16px 16px 0 0;
    background-color: var(--light);
    box-shadow: 2px 2px 5px #00000080;
    width: 144px;
    & .first {
      display: none;
    }
    & .second {
      display: inline;
    }
    & .add-button-text {
      display: inline;
    }
  }
`

const ShelvesList = styled.div`
  display: none;
  width: 144px;
  height: 140px;
  background-color: var(--light);
  position: absolute;
  top: 40px;
  left: 8px;
  border-radius: 0 0 4px 4px;
  box-shadow: 2px 2px 5px #00000080;
  transition: .35s;
  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    & li {
      font-size: 12px;
      height: 32px;
      padding: 1px 4px;
      border-top: 1px #999 solid;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.delete {
        border-radius: 0 0 4px 4px;
        color: #dd2535;
      }
      transition: .1s;
      cursor: pointer;
      &:hover {
        background-color: var(--sec);
      }
      & .shelf-check {
        visibility: hidden;
      }
      & .shelf-check.check-${props => props.shelf} {
        visibility: visible;
      }
    }
  }
  &.active {
    display: block;
  }
`

const ImgContainer = styled.div`
  width: 160px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--sec);
  border-radius: 4px;
  box-shadow: 2px 2px 5px #00000080;
`

const Img = styled.img`
  width: 160px;
  height: 200px;
  object-fit: cover;
  object-position: top;
  border-radius: 4px;
  cursor: pointer;
`

const Text = styled.div`
  width: 160px;
  padding: 4px 8px;
  font-size: 14px;
  color: var(--dark);
  & a {
    color: var(--dark);
    text-decoration: none;
  }
  & p {
    margin: 8px 0;
    width: fit-content;
  }
  & .title {
    font-weight: 500;
    cursor: pointer;
  }
`

export default BookCard