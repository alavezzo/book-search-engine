const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }
    type Book {
        _id: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        me: User
        users: [User]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        deleteBook(bookId: ID!): User
    }
    input savedBook {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }
`

module.exports = typeDefs