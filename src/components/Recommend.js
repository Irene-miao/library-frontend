import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'


const Recommend = ({setError, show}) => {
    const user = useQuery(ME)
    console.log(user.data)
    const genre = user.data?.me?.favouriteGenre
    const result = useQuery(ALL_BOOKS, {
        variables: { genre },
        onError: (error) => {
            console.log(error)
            setError(error.message)
        }
    })

    if (result.loading) {
        return <div>loading...</div>
    }

    if (!show) {
        return null
    }



    return (
        <div>
            <h2>Recommendations</h2>
            books in your favourite genre <strong>{genre}</strong>
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
        </div>
    )
}

export default Recommend
