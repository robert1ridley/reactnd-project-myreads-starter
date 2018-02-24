import React from 'react'

const Book = (props) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }} />
          <div className="book-shelf-changer">
            <select 
              value={props.book.shelf}
              onChange={event =>
                props.moveBook(props.book, event.target.value)}
            >
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        {
          props.book.authors &&
          <div className="book-authors">
            {
              props.book.authors.map((author, i) => 
                <span key={i} style={{display: 'block'}}>{ author }</span>
              )
            }
          </div>
        }
      </div>
    </li>
  )
}

export default Book