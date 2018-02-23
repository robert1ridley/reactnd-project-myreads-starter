import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../components/Shelf'

class MyBooks extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            header="Currently Reading"
          />
          <Shelf
            header="Want to Read"
          />
          <Shelf
            header="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooks;