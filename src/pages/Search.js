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

  onSearch = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
    this.props.searchBooks(this.state.searchTerm)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.props.searchedBooks && this.state.searchTerm!== '' &&
            this.props.searchedBooks.map(book => 
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