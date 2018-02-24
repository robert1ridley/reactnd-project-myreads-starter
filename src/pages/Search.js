import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from '../components/Book';

class Search extends React.Component {
  static propTypes = {
    searchBooks: PropTypes.func.isRequired
  }

  state = {
    searchTerm: ''
  }

  onSeach = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
    this.props.searchBooks(this.state.searchTerm)
  }

  render() {
    console.log (this.props.searchedBooks)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={this.onSeach}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.props.searchedBooks &&
            this.props.searchedBooks.map(book => 
              // <li key={book.id}>
              //   <div className="book">
              //     <div className="book-top">
              //       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              //       <div className="book-shelf-changer">
              //         <select 
              //           value={book.shelf}
              //           onChange={event =>
              //             this.props.moveBook(book, event.target.value)}
              //         >
              //           <option value="none" disabled>Move to...</option>
              //           <option value="currentlyReading">Currently Reading</option>
              //           <option value="wantToRead">Want to Read</option>
              //           <option value="read">Read</option>
              //           <option value="none">None</option>
              //         </select>
              //       </div>
              //     </div>
              //     <div className="book-title">{book.title}</div>
              //     {/* <div className="book-authors">{book.authors.map(author => `${author} `)}</div> */}
              //   </div>
              // </li>
              <Book
                book={book}
                key={book.id}
                moveBook={this.props.moveBook}
              />   
            )
          }
          </ol>
        </div>
      </div>
    )
  }
}
export default Search;
/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.
*/