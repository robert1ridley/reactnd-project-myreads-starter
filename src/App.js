import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MyBooks from './pages/MyBooks'
import Search from './pages/Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }
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

  render() {
    console.log(this.state.shelves)
    return (
      <div className="app">
        <Route exact path="/" render={() => 
          <MyBooks
            books={this.state.books}
            shelves={this.state.shelves}
          /> 
        }/>
        <Route path="/search" component={ Search } />
      </div>
    )
  }
}

export default BooksApp
