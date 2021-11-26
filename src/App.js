import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import RegisterForm from './components/RegisterForm'


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  // Update addedBook in Apollo cache to render to screen immediately
   const updateCacheWith = (addedBook) => {
     // Check if addedBook exist in data
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)
    // If do not exist, add it
     const dataInStore = client.readQuery({ query: ALL_BOOKS })
   if (!includedIn(dataInStore.allBooks, addedBook)) {
     client.writeQuery({
       query: ALL_BOOKS,
       data: { allBooks : dataInStore.allBooks.concat(addedBook)}
     })
   }
   }

   // Receive addedBook data from subscription
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }

  return (
    <div>
     <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('register')}>register</button>
        {token === null ? (<button onClick={() => setPage('login')}>login</button>)
        : (<div><button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button></div>
        )}
      </div>
      <div>
        <Notify errorMessage={errorMessage} />
      </div>
      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
        setError={notify}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          />

      <RegisterForm
          show={page === 'register'}
          setError={notify}
          />

      <Recommend
        show={page === 'recommend'}
        setError={notify}
        />
    </div>
  );
}

export default App;
