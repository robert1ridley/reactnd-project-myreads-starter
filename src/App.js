import React from 'react'
import { Route, Switch } from 'react-router-dom'
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
    searchedBooks: []
  }

  updateShelves = () => {
      this.setState({
        shelves: {
          currentlyReading: this.state.books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: this.state.books.filter(book => book.shelf === 'wantToRead'),
          read: this.state.books.filter(book => book.shelf === 'read'),
          none: this.state.books.filter(book => book.shelf === 'none')
        }
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

  //TODO: if this approach is acceptable, move the api call and update 
  //into a function that can be called from both componentDidMount() and moveBook
  moveBook = (book, shelf) => {
    console.log('evoked')
    BooksAPI.update(book, shelf).then((books) =>
      this.setState({ books })
    )
    .then(() => 
      BooksAPI.getAll().then((books) =>
        this.setState({ books })
      )
      .then(() =>
        this.updateShelves()
      )
    )
  }

  searchBooks = (book) => {
    BooksAPI.search(book).then((books) => {
      const currentBooks = books.map(book => {
        const currentBook = this.state.books.find(b => b.id === book.id)
        book.shelf = currentBook ? currentBook.shelf : 'none'
        return book
      })
        this.setState({
          searchedBooks: currentBooks
        })
      }
    )
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" render={() => 
            <MyBooks
              shelves={this.state.shelves}
              moveBook={this.moveBook}
            /> 
          }/>
          <Route
            path="/search"
            render={() =>
              <Search
                searchBooks={this.searchBooks}
                searchedBooks={this.state.searchedBooks}
              />
          }/>
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
