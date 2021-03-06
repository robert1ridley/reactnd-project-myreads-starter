import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import MyBooks from './pages/MyBooks'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    },
    searchedBooks: [],
    loading: true
  }

  updateShelves = () => {
      this.setState({
        shelves: {
          currentlyReading: this.state.books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: this.state.books.filter(book => book.shelf === 'wantToRead'),
          read: this.state.books.filter(book => book.shelf === 'read'),
          none: this.state.books.filter(book => book.shelf === 'none')
        },
        loading: false
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>
      this.setState({ books })
    )
    .then(() =>
      this.updateShelves()
    )
  }

  moveBook = (book, shelf) => {
    this.setState({ loading: true })
    book.shelf = shelf
    BooksAPI.update(book, shelf).then((books) =>
      this.setState({ books: this.state.books.filter(item => item.id !== book.id).concat([book]) })
    )
    .then(() =>
      this.updateShelves()
    )
    .then(() => 
      this.props.history.push("/")
    )
  }

  searchBooks = (book) => {
    this.setState({ searchedBooks: [], loading: true })
    BooksAPI.search(book).then((books) => {
      if(!books || books.error) {
        return
      }
      const currentBooks = books.map(book => {
        const currentBook = this.state.books.find(item => item.id === book.id)
        book.shelf = currentBook ? currentBook.shelf : 'none'
        return book
      })
        this.setState({
          searchedBooks: currentBooks.sort(sortBy('title')),
          loading: false
        })
      }
    )
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => 
            <MyBooks
              shelves={this.state.shelves}
              moveBook={this.moveBook}
              loading={this.state.loading}
            /> 
          }/>
          <Route
            path="/search"
            render={() =>
              <Search
                searchBooks={this.searchBooks}
                searchedBooks={this.state.searchedBooks}
                moveBook={this.moveBook}
                loading={this.state.loading}
              />
          }/>
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

export default withRouter(BooksApp)