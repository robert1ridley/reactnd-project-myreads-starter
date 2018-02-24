import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from '../components/Shelf'
import loader from '../assets/loader/loader.gif'

const MyBooks = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {
        !props.loading ?
        <div className="list-books-content">
          <Shelf
            header="Currently Reading"
            bookshelf={props.shelves.currentlyReading}
            moveBook={props.moveBook}
          />
          <Shelf
            header="Want to Read"
            bookshelf={props.shelves.wantToRead}
            moveBook={props.moveBook}
          />
          <Shelf
            header="Read"
            bookshelf={props.shelves.read}
            moveBook={props.moveBook}
          />
        </div> :
        <div className="books-grid" style={{marginTop: 40}}>
          <img src={loader} alt="loader" />
        </div>
      }
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

MyBooks.propTypes = {
  shelves: PropTypes.object.isRequired
};

export default MyBooks;