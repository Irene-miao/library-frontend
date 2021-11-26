import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author{
    name
    born
    id
    bookCount
}
`
const BOOK_DETAILS = gql`
fragment BookDetails on Book {
    title
    published
    genres
    author{
        name
        id
        born
        bookCount
    }
    id
}
`


export const ALL_AUTHORS = gql`
query {
    allAuthors {
       ...AuthorDetails
       
    }
}
${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
query findBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
        ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!], $born: Int) {
    addBook(
        title: $title
        author: $author
        published: $published
        born: $born
        genres: $genres
    ) {
       ...BookDetails
    }
}
${BOOK_DETAILS}
`

export const SET_BIRTH = gql`
mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
        ...AuthorDetails
    }
}
${AUTHOR_DETAILS}
`


export const LOGIN = gql`
mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        value
    }
}
`
export const ME = gql`
query {
    me{
        id
        username
        favouriteGenre
    }
}
`

export const BOOK_ADDED = gql`
subscription {
bookAdded {
    ...BookDetails
}
}
${BOOK_DETAILS}
`

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!, $favouriteGenre: String!){
    createUser(username: $username, password: $password, favouriteGenre: $favouriteGenre){
        username
        password
        favouriteGenre
    }
}
`