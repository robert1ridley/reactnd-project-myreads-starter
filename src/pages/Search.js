import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from '../components/Book'
import loader from '../assets/loader/loader.gif'

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
            this.props.loading && <img src={loader} alt="loader" />
          }
          {
            this.props.searchedBooks && this.state.searchTerm!== '' && !this.props.loading &&
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