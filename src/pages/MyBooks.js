import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../components/Shelf'

const MyBooks = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf
          header="Currently Reading"
          bookshelf={props.shelves.currentlyReading}
        />
        <Shelf
          header="Want to Read"
          bookshelf={props.shelves.wantToRead}
        />
        <Shelf
          header="Read"
          bookshelf={props.shelves.read}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

export default MyBooks;