import React from 'react'
import Book from './Book'

const Shelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.header}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            props.bookshelf &&
            props.bookshelf.map(book => 
              <Book
                book={book}
                key={book.id}
                moveBook={props.moveBook}
              />
            )
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf