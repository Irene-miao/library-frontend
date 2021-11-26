import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'



const Books = ({ setError, show}) => {
    const [genre, setGenre] = useState('')
    const [findBooks, result] = useLazyQuery(ALL_BOOKS, {
        onError: (error) => {
            console.log(error)
            setError(error.message)
        }
    })
    
    console.log(result)

    if (result.loading) {
        return <div>loading...</div>
    }

    if (!show) {
        return null
    }

    
    return (
        <div>
            <h2>Books</h2>
            in genre <strong>{genre}</strong>
            <table>
                <tbody>
                    <tr style={{ textAlign: "left" }}>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {result.data?.allBooks.map(b =>
                        <tr key={b.id}>
                            <td>{b.title}</td>
                            <td>{b.author?.name}</td>
                            <td>{b.published}</td>
                        </tr>
                        )}
                </tbody>
            </table>
<div>
<button onClick={() => {
       setGenre('')
       findBooks({})
       }} >all</button>
   <button onClick={() => {
       setGenre('')
       setGenre("refactoring")
       findBooks({ variables: {genre: genre }})
       }} >refactoring</button>
    <button onClick={() => {
       setGenre('')
       setGenre("design")
       findBooks({ variables: {genre: genre }})
       }} >design</button>
    <button onClick={() => {
       setGenre('')
       setGenre("classic")
       findBooks({ variables: {genre: genre }})
       }} >classic</button>
    <button onClick={() => {
       setGenre('')
       setGenre("crime")
       findBooks({ variables: {genre: genre }})
       }} >crime</button>
    <button onClick={() => {
       setGenre('')
       setGenre("patterns")
       findBooks({ variables: {genre: genre }})
       }} >patterns</button>
    <button onClick={() => {
       setGenre('')
       setGenre("baking")
       findBooks({ variables: {genre: genre }})
       }} >baking</button>
    <button onClick={() => {
       setGenre('')
       setGenre("agile")
       findBooks({ variables: {genre: genre }})
       }} >agile</button>
    <button onClick={() => {
       setGenre('')
       setGenre("revolution")
       findBooks({ variables: {genre: genre }})
       }} >revolution</button>
    <button onClick={() => {
       setGenre('')
       setGenre("testing")
       findBooks({ variables: {genre: genre }})
       }} >testing</button>
</div>
        </div>
    )
}

export default Books
