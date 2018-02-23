import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MyBooks from './pages/MyBooks'
import Search from './pages/Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>
      this.setState({ books })
    )
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        <Route exact path="/" component={ MyBooks } />
        <Route path="/search" component={ Search } />
      </div>
    )
  }
}

export default BooksApp
