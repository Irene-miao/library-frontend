import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries'


const NewBook = ({ show, setError, updateCacheWith}) => {
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [published, setPublished] = useState('')
const [born, setBorn] = useState('')
const [genre, setGenre] = useState('')
const [genres, setGenres] = useState([])

const [ createBook ] = useMutation(CREATE_BOOK, {
    onError: (error) => {
        console.log(error)
        setError(error.message)
    },
    update: (store, response) => {
       updateCacheWith(response.data.addBook)
    }
})

if (!show) {
    return null
}


const submit = (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({ variables: { title, author, published, genres, born}})
    setTitle('')
    setAuthor('')
    setPublished('')
    setBorn('')
    setGenre('')
    setGenres([])
}

const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
}
console.log(published)

    return (
        <div>
            <h2>Add Book</h2>
           <form onSubmit={submit}>
               <div>
                   title 
                   <input value={title}
                   onChange={({target}) => setTitle(target.value)}
                   />
               </div>
               <div>
                   author 
                   <input value={author}
                   onChange={({target}) => setAuthor(target.value)}
                   />
               </div>
               <div>
                   published
                   <input value={published} 
                   onChange={({target}) => setPublished(parseInt(target.value, 10))}
                   />
               </div>
               <div>
                   Author birthdate
                   <input value={born} 
                   onChange={({target}) => setBorn(parseInt(target.value, 10))}
                   />
               </div>
               <div>
                   <input value={genre}
                   onChange={({target}) => setGenre(target.value)}
                   />
                   <button onClick={addGenre} type='button'>add genre</button>
               </div>
               <div>
                  genres: {genres.join(' ')}
               </div>
               <button type='submit'>create book</button>
               </form> 
        </div>
    )
}

export default NewBook
